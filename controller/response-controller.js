const { response } = require("../app");
const Response = require("../model/Response");

exports.getAllResponses = async (req, res) => {
  try {
    const responses = await Response.find();
    if (responses) {
      res.status(200).json({
        status: "success",
        result: responses.length,
        data: responses,
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "fali",
      message: error,
    });
  }
};

exports.submitResponse = async (req, res) => {
  try {
    //console.log(req);
    const submission = req.body;
    console.log(submission);
    await Response.create(submission);
    res.status(200).json({
      status: "success",
      message: "response successfully submitted",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error,
    });
  }
};

exports.updateResponse = (req, res) => {};
exports.deleteResponse = (req, res) => {};
