const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');



exports.login =  async (req, res) => {
  const { email, password } = req.body;
  try {
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
      }
      user.comparePassword(password, (err, isMatch) => {
          if (err) throw err;
          if (!isMatch) {
              return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
          }
          const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
          res.json({ token });
      });
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOneUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.registerUser = async (req, res) => {
  try {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    });
    const savedUser = await newUser.save();
    console.log(savedUser);
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.editUser = async (req, res) => {
  try {
    
    console.log("req: ", req.body);

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const updatedUser = await User.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        {new: true}
    );
    updatedUser.password = hashedPassword;
    if (!updatedUser) return res.status(404).json({ message: "User not found" });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });
    res.status(200).json("User deleted succesfully !");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
