import User from "../models/User.js"
import bcrypt from "bcrypt"
import { createError } from "../utils/error.js"

//Register
export const Register = async (req, res, next) => {

    try {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)

        const newUser = new User({
            username:req.body.username,
            photo:req.body.photo,
            email:req.body.email,
            phone:req.body.phone,
            password:hash
        })
        await newUser.save()
        res.status(200).json("User Created")
    } catch (err) {
        next(createError(400, "User already exist"))
    }
}

//Login
export const Login = async (req, res, next) => {

    try {
        const user = await User.findOne({
            email:req.body.email
        })
        if(!user) return next(createError(404, "Email does not exist"))

        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            user.password
        )

        if(!isPasswordCorrect) return next(createError(400, "Invalid password"))

        const { password, ...otherDetails } = user._doc
        res.status(200).json({...otherDetails})
    } catch (err) {
        next(err)
    }
}

//Profile Update
export const UpdateProfile = async (req, res, next) => {
    try {
        const updateUsername = await User.findOne({username:req.body.username})

        const updateEmail = await User.findOne({email:req.body.email})

        const updatePhone = await User.findOne({phone:req.body.phone})

        if(updateUsername) {
            return next(createError(400, "Username taken"))
        } else if(updateEmail){
            return next(createError(400, "Email taken"))
        } else if(updatePhone){
            return next(createError(400, "Phone taken"))
        }
        else {
            await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
        }
        res.status(200).json("Profile updated")
    } catch (err) {
        next(err)
    }
}

export const UpdateUsername = async (req, res, next) => {
    try {
        const updateUsername = await User.findOne({username:req.body.username})

        if(updateUsername) {
            return next(createError(400, "Username taken"))
        }
        else {
            await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
        }
        res.status(200).json("Username updated")
    } catch (err) {
        next(err)
    }
}

export const UpdateEmail = async (req, res, next) => {
    try {
        const updateEmail = await User.findOne({email:req.body.email})

        if(updateEmail){
            return next(createError(400, "Email taken"))
        }
        else {
            await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
        }
        res.status(200).json("Email updated")
    } catch (err) {
        next(err)
    }
}

export const UpdatePhone = async (req, res, next) => {
    try {
        const updatePhone = await User.findOne({phone:req.body.phone})

        if(updatePhone){
            return next(createError(400, "Phone taken"))
        }
        else {
            await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
        }
        res.status(200).json("Phone updated")
    } catch (err) {
        next(err)
    }
}

//Password Match
export const MatchPassword = async (req, res, next) => {

    try {
        const Password = await User.findById(req.params.id)

        const PasswordCorrect = await bcrypt.compare(
            req.body.password,
            Password.password
        )

        if(!PasswordCorrect) return next(createError(400, "Invalid password"))

        res.status(200).json("Password matched")
    } catch (err) {
        next(err)
    }
}

//Password Update
export const UpdatePassword = async (req, res, next) => {

    try {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)

        const OldPassword = await User.findById(req.params.id)

        const NewPasswordCorrect = await bcrypt.compare(
            req.body.password,
            OldPassword.password
        )

        if(NewPasswordCorrect) return next(createError(400, "Enter new password"))

        await User.findByIdAndUpdate(req.params.id,{password:hash}, {new: true})
        res.status(200).json("Password Updated")
    } catch (err) {
        next(err)
    }
}

//Delete
export const DeleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User Deleted")
    } catch (err) {
        next(err)
    }
}

//Get
export const GetUser = async (req, res, next) => {
    try {
        const GetUser = await User.findById(req.params.id)
        res.status(200).json(GetUser)
    } catch (err) {
        next(err)
    }
}

//Get All
export const GetAllUsers = async (req, res, next) => {
    const {...others} = req.query
    try {
        const GetAllUser = await User.find({...others})
        res.status(200).json(GetAllUser)
    } catch (err) {
        next(err)
    }
}
