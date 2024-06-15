import User from "../models/User.js";

export const adminUsers = async(req,res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
      } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
      }
}

export const promote = async (req,res) => {
    try {
        let user = await User.findById(req.params.id);
    
        if (!user) {
          return res.status(404).json({ msg: 'User not found' });
        }
    
        user.role = 'admin';
        await user.save();
    
        res.json(user);
      } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
      }
}

export const demote = async (req,res) =>{
    try {
        let user = await User.findById(req.params.id);
    
        if (!user) {
          return res.status(404).json({ msg: 'User not found' });
        }
    
        user.role = 'user';
        await user.save();
    
        res.json(user);
      } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
      }
}