import bcrypt from"bcrypt";
import User from "../models/users.js";
import ReferralCode from"../models/referralCodes.js";
import {generateOne,charset} from "referral-codes";
import Address from "../models/addresses.js";
import { setUser } from "../services/auth.js" ;
//GET USER
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({})
    .populate({ path: "referralCode", strictPopulate: false })
    .populate({ path: "referredBy", strictPopulate: false })
    .populate({ path: "addresses", strictPopulate: false })
    .populate({ path: "orders", strictPopulate: false })
    .populate({path:"cancelledProducts",strictPopulate:false})
    .exec();
    res.status(200).send(users);
  } catch (error) {
    res.status(200).send(error);
  }
};
const getUser = async (req, res) => {
  const { _id } = req.body;
  try {
    const user = await User.findOne({ _id })
    .populate({ path: "referralCode", strictPopulate: false })
    .populate({ path: "referredBy", strictPopulate: false })
    .populate({ path: "addresses", strictPopulate: false })
    .populate({ path: "orders", strictPopulate: false })
    .populate({path:"cancelledProducts",strictPopulate:false})
    .exec();
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send("user not found");
    }
  } catch (error) {
    res.status(404).send("user not found");
  }
};
//SIGNUP
const signUp = async (req, res) => {
  const { name, email, phone, password, referralCode } = req.body;
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    const encryptedPassword = bcrypt.hashSync(
      password,
      10,
      null,
      null,
      (err, hash) => {
        return hash;
      }
    );
    if (!referralCode) {
      var user = new User({
        name,
        email,
        phone,
        password: encryptedPassword,
      });
    } else {
      var user = new User({
        name,
        email,
        phone,
        password: encryptedPassword,
        referredBy: referralCode,
      });
    }

    try {
      const savedUser = await user.save();
      const referralCode = generateOne({
        length: 9,
        pattern: "##-###-##",
        prefix: "",
        postfix: "",
        charset: charset("alphanumeric"),
      });
      const newReferralCode = new ReferralCode({
        referralCode,
        createdBy: savedUser.name,
        createdById: savedUser._id,
      });
      const savedReferralCode = await newReferralCode.save();
      await savedUser.updateOne({
        $set: { referralCode: savedReferralCode._id },
      });
      res.status(200).send("REGISTRATION SUCCESSFULL");
    } catch (error) {
      res.status(400).send("Sign Up Error" + error);
    }
  } else {
    res.status(400).send("USER WITH THIS EMAIL AND PASSWORD ALREADY EXISTS");
  }
};
//LOGIN
const logIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExists = await User.findOne({ email })
    .populate({ path: "referralCode", strictPopulate: false })
    .populate({ path: "referredBy", strictPopulate: false })
    .populate({ path: "addresses", strictPopulate: false })
    .populate({ path: "orders", strictPopulate: false })
    .populate({path:"cancelledProducts",strictPopulate:false})
    .exec();
    if (userExists) {
      if (bcrypt.compare(password, userExists.password)) {
        const token = setUser({ userExists });
        res.cookie("uid", token, {
          httpOnly: true,
          expires: new Date(Date.now() + 360 * 24 * 3600000),
        });
        res.status(200).send(userExists);
      } else {
        res.status(400).send("Invalid Credentials");
      }
    } else {
      res.status(404).send("no user exists with this email id");
    }
  } catch (error) {
  }
};
//UPDATE
const addAddress = async (req, res) => {
  const {
    name,
    phone,
    addressLine1,
    addressLine2,
    city,
    pincode,
    landmark,
    _id,
  } = req.body;
  try {
    const address = new Address({
      name,
      phone,
      addressLine1,
      addressLine2,
      city,
      pincode,
      landmark,
    });
    const savedAddress = await address.save();
    const updatedUser = await User.findOneAndUpdate(
      { _id },
      { $push: { addresses: savedAddress._id } },
      { new: true }
    )
    .populate({ path: "referralCode", strictPopulate: false })
    .populate({ path: "referredBy", strictPopulate: false })
    .populate({ path: "addresses", strictPopulate: false })
    .populate({ path: "orders", strictPopulate: false })
    .populate({path:"cancelledProducts",strictPopulate:false})
    .exec();
    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(400).send(error);
  }
};
// UPDATE CART
const updateCart = async (req, res) => {
  const { cart, _id } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { _id },
      { $set: { cart } },
      { new: true }
    )
    .populate({ path: "referralCode", strictPopulate: false })
    .populate({ path: "referredBy", strictPopulate: false })
    .populate({ path: "addresses", strictPopulate: false })
    .populate({ path: "orders", strictPopulate: false })
    .populate({path:"cancelledProducts",strictPopulate:false})
    .exec();
    read.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};
//CHANGE ROLE
const changeRole = async (req, res) => {
  const { user_id, role } = req.query;
  try {
    const response = await User.findByIdAndUpdate(
      { _id: user_id },
      { $set: { role: role } },
      { new: true }
    );
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send(error);
  }
};
const searchUser = async (req, res) => {
  const { customerName } = req.query;
  try {
    const users = await User.find({
      name: { $regex: new RegExp(".*" + customerName + ".*", "i") },
    }).exec();
    res.status(200).send(users);
  } catch (error) {
    res.status(404).send("PRODUCT NOT FOUND");
  }
};
const updateUserDetail = async (req, res) => {
  const { _id } = req.body;
  const { detail } = req.query;
  const parsedDetail = JSON.parse(detail);
  let updatedUser = {};
  let encryptedPassword = "";
  try {
    const user = await User.findById({ _id });
    if (parsedDetail.name.length === 0) {
      parsedDetail.name === user.name;
    }
    if (parsedDetail.email.length === 0) {
      parsedDetail.email === user.email;
    }
    if (parsedDetail.phone.length === 0) {
      parsedDetail.phone === user.phone;
    }
    if (parsedDetail.password.length === 0) {
      updatedUser = await User.findByIdAndUpdate({_id},
        {
          $set: {
            name: parsedDetail.name,
            email: parsedDetail.email,
            phone: parsedDetail.phone,
          },
        },
        { new: true }
      );
    } else {
      encryptedPassword = bcrypt.hashSync(
        parsedDetail.password,
        10,
        null,
        null,
        (err, hash) => {
          return hash;
        }
      );
      updatedUser = await User.findByIdAndUpdate({_id},
        {
          $set: {
            name: parsedDetail.name,
            email: parsedDetail.email,
            phone: parsedDetail.phone,
            password: encryptedPassword,
          },
        },
        { new: true }
      );
    }
    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(400).send(error);
  }
};
//LOGOUT
const logOut = async (req, res) => {
  res.clearCookie("uid");
  res.status(200).send("logged out");
};
//DELETE
export {
  signUp,
  logIn,
  logOut,
  getUser,
  addAddress,
  updateCart,
  getAllUsers,
  changeRole,
  searchUser,
  updateUserDetail,
};