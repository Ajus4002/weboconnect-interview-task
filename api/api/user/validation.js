import Joi from 'joi';

const registerValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    gender: Joi.string().valid('male', 'female', 'other').required(),
    phone: Joi.string().required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};

const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};



const updateUserProfileValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    gender: Joi.string().valid('male', 'female', 'other').required(),
    phone: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};




const validateChangePasswordRequest = async (req, res, next) => {
  try {
    const changePasswordSchema = Joi.object({
      newPassword: Joi.string().min(8).required(),
    });

    await changePasswordSchema.validateAsync(req.body);
    next();
  } catch (error) {
    res.status(400).json({ error: error.details[0].message });
  }
};


export { registerValidation, loginValidation,  updateUserProfileValidation, validateChangePasswordRequest };
