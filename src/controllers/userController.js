const User = require("../models/user");


module.exports.userDetail = async (req, res) => {
    const foundUser = await User.findById(id);
    res.status(201).json(foundUser);
}

module.exports.login = async (req, res) => {
    // const { id } = req.params;
    // console.log("ログイン試行:", req.body.email, req.body.password);
    const foundUser = await User.findOne({email: req.body.email, password: req.body.password});
    res.status(201).json(foundUser);
}

module.exports.registerUser = async (req, res) => {
    const userData = {
        ...req.body,
    };
    const newUser = new User(userData);
    await newUser.save();
    res.status(201).json(newUser);
}

module.exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.status(201).json(user);
}

module.exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    res.status(201).json(deletedUser);
}