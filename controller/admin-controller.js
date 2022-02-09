const res = require("express/lib/response");
const generator = require("generate-password");
const Admin = require("../model/admin");
const Email = require("../utils/Email");
exports.addAdmin = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const password = await generator.generate({ length: 10, numbers: true });
    //console.log(password);
    const newAdmin = await Admin.create({ name, email, password });
    console.log(newAdmin);
    if (!newAdmin) {
      res.status(400).json({
        status: "fail",
        message: "error",
      });
    }
    const url = `${req.protocol}://${req.get("host")}/login`;
    console.log(url);
    await new Email(newAdmin, url).sendWelcome(password);
    res.status(201).json({
      status: "success",
      message: "A new admin was successfully added",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: error,
    });
  }
};

exports.removeAdmin = () => {};

exports.updateAdmin = () => {};
exports.getAllAdmins = () => {};
