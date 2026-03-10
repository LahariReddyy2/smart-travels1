 import User from "../models/User.js";
import bcrypt from "bcryptjs";


// REGISTER USER
const registerUser = async (req, res) => {
  try {

    let { name, email,mobile, password } = req.body;

    // remove spaces and normalize email
    email = email.trim().toLowerCase();

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      mobile,
      password: hashedPassword
    });

    await user.save();

    res.json({ message: "Registration successful" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};


// LOGIN USER
const loginUser = async (req, res) => {
  try {

    let { email, password } = req.body;

    // normalize email
    email = email.trim().toLowerCase();

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ message: "Invalid password" });
    }

    res.json({
      message: "Login successful",
      user
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export { registerUser, loginUser };