const Admin = require("../model/admin");
const dotenv = require("dotenv");
const { cookie } = require("express/lib/response");
const { promisify } = require("util");

dotenv.config();
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    //Check if email or password is not empty
    if (!email || !password) {
      res.status(400).json({
        status: "fail",
        message: "Email and Password values cannot be empty",
      });
    }
    //Check if email exists on the database and password is correct
    const admin = await Admin.findOne({ email }).select("+password");
    if (!admin || !admin.checkPassword(password, admin.password)) {
      res.status(400).json({
        status: "fail",
        message: "Invalid email or password",
      });
    }
    //Create a token to send back to the clientside
    const token = await jwt.sign(
      {
        id: admin._id,
        emai: admin.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: `${process.env.JWT_EXPIRES}` }
    );

    const cookieOptions = {
      expires: new Date(Date.now() + process.env.JWT_EXPIRES * 60 * 60 * 1000),
      httpOnly: true,
    };

    if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

    res.cookie("jwt", token, cookieOptions);
    admin.password = undefined;
    res.status(200).json({
      token,
      data: admin,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.protect = async (req, res, next) => {
  //1. Check if token comes with the request
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return res.status(401).json({
      status: "error",
      message: "You are not logged in, Please login to gain access",
    });
  }
  //2. Verify the token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log(decoded);
  //3. Check if admin still exists
  //const currentAdmin= Admin.findOne()
  //4. Check if admin changed password after the token was issued
  next();
};
exports.restrictAdmin = () => {};
exports.forgetPassword = () => {};
exports.resetPassword = () => {};
