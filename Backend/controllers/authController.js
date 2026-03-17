 import User from "../models/User.js";
import bcrypt from "bcryptjs";


// REGISTER USER
const registerUser = async (req, res) => {
  try {

    let { name, email, mobile, password } = req.body;

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

 const updateProfile = async (req, res) => {
  try {

    const { name, email, mobile, password } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email required" });
    }

    // find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let updatedData = {};

    if (name) {
      updatedData.name = name;
    }

    if (mobile) {
      updatedData.mobile = mobile;
    }

    // hash password only if user typed a new one
    if (password && password.trim()) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updatedData.password = hashedPassword;
    }

    const updatedUser = await User.findOneAndUpdate(
      { email },
      updatedData,
      { new: true }
    );

    res.json({
      message: "Profile updated successfully",
      user: updatedUser
    });

  } catch (error) {
    console.log("Update Profile Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export { registerUser, loginUser, updateProfile };
