
import jwt from 'jsonwebtoken'
import User from '../models/User.js'


export const auth = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token.replace('Bearer ',''), process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

export const roleAuth = (roles) => (req, res, next) => {
  auth(req, res, async () => {
    const user = await User.findById(req.user.id);
    if (!roles.includes(user.role)) {
      return res.status(403).json({ msg: 'Access denied' });
    }
    next();
  });
};


