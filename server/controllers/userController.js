const User = require("../models/userDB");
const bcrypt = require("bcrypt");

const UserRegister = async (req, res) => {
  try {
    const { FirstName, LastName, Email, Password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(Password, salt);

    const user = new User({
      FirstName,
      LastName,
      Email,
      Password: hashedPassword,
    });

    await user.save();

    if (!FirstName || !LastName || !Email || !Password) {
      return res.status(400).json({
        success: false,
        msg: "Please fill up all the fields",
      });
    }

    return res.status(200).json({
      msg: "User registered succesfully",
      user,
    });

    const existingUser = await User.findOne({ Email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        msg: "User already exists",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "internal Server Error",
      error: error.message,
    });
  }
};

// user login
const Userlogin = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    const user = await User.findOne({ Email });

    return res.status(200).json({
      msg: "Login Successful",
      user,
    });
    
    // user not found
    if (!user) {
      return res.Status(401).json({
        msg: "No user found !",
      });
    }

    // password mismatched
    if (user.Password !== Password) {
      return res.status(401).json({
        msg: "Password Mismatch !",
      });
    }

    // email and password not filled
    if (!Email || !Password) {
      return res.status(400).json({
        msg: "Email and Password are required",
      });
    }
    
  } catch (error) {
    return res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

module.exports = { UserRegister, Userlogin };
