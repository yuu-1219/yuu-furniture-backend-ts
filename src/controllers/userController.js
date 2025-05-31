const bcrypt = require('bcrypt');
const User = require("../models/user");


module.exports.userDetail = async (req, res) => {
    const { id } = req.params;
    const foundUser = await User.findById(id);
    const { password: _, ...withoutPasswordUser } = foundUser.toObject();
    res.status(201).json(withoutPasswordUser);
}

module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email: email });

    const isMatch = await bcrypt.compare(password, foundUser.password);

    if (isMatch) {
        const { password: _, ...withoutPasswordUser } = foundUser.toObject();
        res.status(201).json(withoutPasswordUser);
    } else {
        return res.status(401).json({ message: 'パスワードが違います' });

    }
}

module.exports.registerUser = async (req, res) => {
    const saltRounds = 10;
    const { userInfo, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const userData = {
        ...userInfo,
        password: hashedPassword
    };
    const newUser = new User(userData);
    await newUser.save();

    const { password: _, ...withoutPasswordUser } = newUser.toObject();
    res.status(201).json(withoutPasswordUser);
}

module.exports.updateUserInfo = async (req, res) => {
    const { id } = req.params;
    const targetUser = await User.findById(id);
    const updatedUser = {
        ...req.body,
        password: targetUser.password
    }
    const changedUser = await User.findByIdAndUpdate(id, updatedUser, { runValidators: true, new: true });
    const { password: _, ...withoutPasswordUser } = changedUser.toObject();
    res.status(201).json(withoutPasswordUser);
}

module.exports.updateUserPassword = async (req, res) => {
    const saltRounds = 10;

    const { id } = req.params;
    const { password } = req.body;

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const updatedUser = await User.findByIdAndUpdate(id, {password: hashedPassword}, { runValidators: true, new: true });
    const { password: _, ...withoutPasswordUser } = updatedUser.toObject();
    res.status(201).json(withoutPasswordUser);
}

module.exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);

    const { password: _, ...withoutPasswordUser } = deletedUser.toObject();
    res.status(201).json(withoutPasswordUser);
}