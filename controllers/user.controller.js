const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.Schema");

const signup =async (req, res) => {
    const { username, email, password,role } = req.body;
        const User = await userModel.findOne({ email });
        if (!User) {
            bcrypt.hash(password, 7, async (err, hash) => {
                if (err) {
                    res.send(err)
                }
                else {
                    let data = await userModel.create({ username: username, email: email, password: hash ,role:role})
                    res.cookie("role", data.role)
                    res.cookie("id", data._id)
                    res.json(data)
                }
            })
        }
        else {
            return res.status(400).json({ message: 'User already exists' });
        }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found!' });
        }
        else {
            const isMatch =  bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Incorect Password' });
            }
            else {
                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
                res.cookie("token", token)
                res.cookie("role", user.role)
                res.cookie("id", user._id)
                res.status(200).json({ token, userID: user._id });
            }
        }
}

module.exports = { signup, login }