const User = require("../model/userModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer=require('nodemailer')

const getLogin=asyncHandler(async(req,res)=>{
     res.status(200)
})

const registerUser = asyncHandler(async (req, res) => {
  const { name, password, email } = req.body;

  if (!name || !password || !email) {
    res.status(400);
    throw new Error("Input fields missing.");
  }
  let userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("User Already Exist.");
  }

  let salt = await bcrypt.genSalt(10);

  let hashedPassword = await bcrypt.hash(password, salt);

  let user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  if (!user) {
    res.status(400);
    throw new Error("invalid inputs");
  } else {
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: 'vijaymahadevan15@gmail.com',
          pass: 'cjoaecowteadpgqb'
        }
      })
   const authToken=generateToken(user._id)
  
      const mailOptions = {
        from: '"Fred Foo 👻" <vijaymahadevan15@gmail.com>', // sender address
        to: user.email, // list of receivers
        subject: "Confirmation", // Subject line
        text: "Hello world?", // plain text body
        html: `<b>${user.name}!Thanks for verifing.</b>
        <h4>Please verify your Mail to continue.</h4>
             <a href='http://${req.headers.host}/api/users/verify-email?token=${authToken}'>Verify your email.</a>`, // HTML body
      };
  
      const info = await transporter.sendMail(mailOptions);
  
      res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        token: authToken
      });
    } catch (error) {
      // Handle any errors that occur during the process
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send email" });
    }
  } 

  
})

const verifyEmail=async(req,res,next)=>{
  try {
    console.log('i am in the top nost')
    let token=req.query.token
 
    
    
      let decoded= jwt.verify(token,process.env.JWT_SECRET)
            
      const user=await User.findById(decoded.id).select('-password')
           if(user){
            console.log('i am i nside user');
      req.token=null
      user.isEmailVerified=true
      await user.save()
          next()
          res.send('Your Email Verified.')
           }else{
            
            console.log('user not verified.');
           }
    
  } catch (error) {
    console.log(error)
  }

}

const getme = asyncHandler(async (req, res) => {
  const { name, email, id } = req.user;
  res.json({
    name,
    email,
    id,
  });
});
const postloginUser = asyncHandler(async (req, res) => {
  const { password, email } = req.body;

  if (!password || !email) {
    res.status(400);
    throw new Error("Input fields missing.");
  }
  let user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("invalid Credentials")
  }
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  postloginUser,
  getme,
  registerUser,
  verifyEmail,
  getLogin
};
