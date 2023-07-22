import bcrypt from 'bcrypt';
import path from 'path';
import jwt from 'jsonwebtoken';
import {Op} from 'sequelize'
import paginate from 'express-pagination';

import User from '../../model/user.js';

const JWT_SECRET = 'your_jwt_secret_key';

const register = async (req, res) => {
  try {
    const { name, email, gender, phone, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      gender,
      phone,
      password: hashedPassword,
    });

    res.json(newUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error while registering the user' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Error while logging in' });
  }
};

const viewUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Error while fetching the user profile' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email, gender, phone } = req.body;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.name = name;
    user.email = email;
    user.gender = gender;
    user.phone = phone;
    await user.save();

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Error while updating the user profile' });
  }
};

const changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { newPassword } = req.body;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Password changed successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error while changing the password' });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.destroy();

    res.json({ message: 'Account deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error while deleting the account' });
  }
};


 const uploadProfilePic = async (req, res) => {
  try {
    if (!req.files || !req.files.profile_pic) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    const profilePic = req.files.profile_pic;

    if (!profilePic.mimetype.startsWith('image/')) {
      return res.status(400).json({ error: 'Only image files are allowed.' });
    }

    const uploadPath = path.join('public/uploads', `profile_${req.user.id}${path.extname(profilePic.name)}`);
    await profilePic.mv(uploadPath);

    const userId = req.user.id;
    const user = await User.findByPk(userId);
    user.profile_pic = `/uploads/profile_${req.user.id}${path.extname(profilePic.name)}`;
    await user.save();

    res.json(user);
  } catch (err) {
    console.error('Error uploading profile picture:', err);
    res.status(500).json({ error: 'Failed to upload profile picture.' });
  }
};


 const listUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10; 

    const sortField = req.query.sort || 'name';
    const sortOrder = req.query.order || 'ASC';

    const { count, rows } = await User.findAndCountAll({
      order: [[sortField, sortOrder]],
      limit,
      offset: (page - 1) * limit,
    });

    const totalPages = Math.ceil(count / limit);
    const currentPage = page;
    const users = rows;

    res.render('userList', {
      users,
      currentPage,
      totalPages,
      sortField,
      sortOrder,
    });
  } catch (err) {
    console.error('Error retrieving users:', err);
    res.status(500).json({ error: 'Failed to retrieve users.' });
  }
};


const searchUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10; 

    const sortField = req.query.sort || 'name';
    const sortOrder = req.query.order || 'ASC';

    const searchTerm = req.query.search;
    const { count, rows } = await User.findAndCountAll({
      where: {
        name: {
          [Op.like]: `%${searchTerm}%`,
        },
      },
      order: [[sortField, sortOrder]],
      limit,
      offset: (page - 1) * limit,
    });

    const totalPages = Math.ceil(count / limit);
    const currentPage = page;

    res.render('userList', {
        users: rows,
        currentPage,
        totalPages,
        sortField,
        sortOrder,
    });
  } catch (err) {
    console.error('Error searching users:', err);
    res.status(500).json({ error: 'Failed to search users.' });
  }
};



export {
  register,
  login,
  viewUserProfile,
  updateProfile,
  changePassword,
  deleteAccount,
  uploadProfilePic,
  listUsers,
  searchUsers
};
