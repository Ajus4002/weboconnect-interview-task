import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your_jwt_secret_key';

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Authorization token not found' });
  }

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    req.user = { id: decodedToken.userId };
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

export default authMiddleware;
