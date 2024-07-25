import User from "../models/RegisterModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const Register = async (req, res) => {
    try {
        const { username, email, password, phone } = req.body
        const userExist = await User.findOne({ email })
        if (!username || !email || !password || !phone) {
            return res.status(400).json("All fields are required!")
        }
        else if (userExist) {
            return res.status(400).json("User already exists!")
        }
        else {
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            const hashedPassword = await bcrypt.hash(password, salt);
            const user = new User({
                username: username,
                email: email,
                password: hashedPassword,
                phone: phone
            })
            const savedUser = await user.save()
            res.status(201).json(savedUser)
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body
        const userExist = await User.findOne({ email })
        if (!email || !password) {
            return res.status(401).json("All fields are required!")
        }
        else if (userExist) {
            const passwordMatch = await bcrypt.compare(password, userExist.password);
            if (passwordMatch) {
                const token = jwt.sign({ userId: userExist._id }, 'SECRET_KEY');
                return res.status(200).json({ access_token: token, user: userExist });
            }
            else {
                return res.status(401).json("Wrong credentials!")
            }
        }
        else {
            return res.status(400).json("User doesnt exists!")
        }
    } catch (error) {
        res.status(401).json(error.message)
    }
}

export const getUser = async (req, res) => {
    try {
        const userId = req.user.userId
        const userDetails = await User.findOne({ _id: userId })
        if (userDetails) {
            res.status(200).json(userDetails)
        }
        else {
            res.status(400).json("User not found")
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

export const updateUser = (async (req, res) => {
    try {
        const userId = req.user.userId;
        const { username, email, phone } = req.body

        const user = await User.findOne({ _id: userId });

        user.username = username;
        user.email = email;
        user.phone = phone;
        await user.save();

        res.status(201).json(user);

    } catch (error) {
        res.status(500).json(error);
    }
})

export const updateUserPassword = (async (req, res) => {
    try {
        if (req.body.password && req.body.newpassword) {
            const userId = req.user.userId;
            const { password, newpassword } = req.body;
            const user = await User.findOne({ _id: userId });
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
                const salt = await bcrypt.genSalt();
                const hashedPassword = await bcrypt.hash(newpassword, salt);
                user.password = hashedPassword;
                user.save();
                res.status(200).json("Password updated");
            }
            else {
                res.status(400).json("Incorrect Current Password!");
            }
        }
    } catch (error) {
        res.status(500).json(error);
    }
})