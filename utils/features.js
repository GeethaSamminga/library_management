const jwt = require("jsonwebtoken")

const Tokengenerator = (user,res,message,statuscode = 200)=>{

const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
 res.status(statuscode).cookie("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
  }).json({
      success: true,
      message
  });
}
module.exports = Tokengenerator;