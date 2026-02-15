require("dotenv").config();
const Admin = require("../models/adminDB");
const bcrypt = require("bcrypt");

// admin login api
const AdminLogin = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    // find by email
    const AdminUser = await Admin.findOne({ Email });

    // if not registered
    if (!AdminUser) {
      return res.status(401).json({
        msg: "User Not found !",
      });
    }

    // require email and password
    if (!Password || !Email) {
      return res.status(401).json({
        msg: "Invalid Credentials !",
      });
    }

    // compare provided password with hashed password
    const passwordMatch = await bcrypt.compare(Password, AdminUser.Password);
    if (!passwordMatch) {
      return res.status(401).json({
        msg: "Invalid Credentials !",
      });
    }

    // successfully logged in
    const safeUser = AdminUser.toObject();
    delete safeUser.Password;
    return res.status(200).json({
      msg: "Successfully Logged in !",
      AdminUser: safeUser,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Internal Server Error",
      error: error.message,
    });
  }
};

// admin register api
const AdminRegister = async (req, res) => {
  try {
    const { FirstName, LastName, PhoneNumber, Address, Email, Password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(Password, salt);

    // if all the fields are not filled
    if (
      !FirstName ||
      !LastName ||
      !PhoneNumber ||
      !Address ||
      !Email ||
      !Password
    ) {
      return res.status(400).json({
        success: false,
        msg: "Please fill all the fields",
      });
    }

    // if existing user then dont re-register
    const existingAdminUser = await Admin.findOne({ Email });
    if (existingAdminUser) {
      return res.status(400).json({
        success: false,
        msg: "Already Registered !",
      });
    }

    // create and save new admin
    const adminData = {
      FirstName,
      LastName,
      PhoneNumber,
      Address,
      Email,
      Password: hashedPassword,
    };

    const AdminUser = new Admin(adminData);
    await AdminUser.save();

    return res.status(201).json({
      success: true,
      msg: "Admin Registered Successfully",
      AdminUser,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = { AdminLogin, AdminRegister };
