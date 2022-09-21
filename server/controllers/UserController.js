const { User } = require("../models");

const getUserByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const options = {
      where: { email },
      attributes: ["id", "name", "email", "createdAt", "updatedAt"],
    };
    const user = await User.findOne(options);
    res.status(200).json({
      message: "Successfully get detail a user",
      user,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const createUser = (req, res) => {
  const { username, password, email } = req.body;
  console.log("cek data masuk : ", username, password, email);

  // User.create({
  // 	username: username,
  // 	password: password,
  // 	email: email,
  // })
  // 	.then(() => {
  // 		res.status(200).json({
  // 			message: "Successfully create user",
  // 		});
  // 	})
  // 	.catch((err) => {
  // 		res.status(500).json({
  // 			message: "error creating user : " + err.message,
  // 		});
  // });
};

const getUserAllUser = (req, res) => {
  res.json({
    message: "Get User",
  });
};

module.exports = { getUserByEmail, getUserAllUser, createUser };
