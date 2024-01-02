const User = require("../models/UserModel")
const bcrypt = require('bcrypt')
const { genneralAccessToken, genneralRefreshToken } = require("./JwtServices")
const createUser = (newUser) => {

    return new Promise(async (resolve, reject) => {
        const { name, email, password, confirmPassword, phone } = newUser
        try {
            const checkUser = await User.findOne({
                email: email
            })
            if (checkUser !== null) {
                resolve({
                    status: 'Error',
                    message: 'the Email is already'
                })
            }
            const hash = bcrypt.hashSync(password, 10)
            const createdUser = await User.create({
                name,
                email,
                password: hash,
                phone
            })
            if (createdUser) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createdUser
                })
            }

        } catch (e) {
            reject(e)
        }
    })
}

const loginUser = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const { email, password } = userLogin
        try {
            const checkUser = await User.findOne({
                email: email
            })



            if (checkUser === null) {
                resolve({
                    status: 'Error',
                    message: 'the ser is not defindued'
                })
            }
            const comparePassword = bcrypt.compareSync(password, checkUser.password)
            if (!comparePassword) {
                resolve({
                    status: 'Error',
                    message: 'the password  or user is incorrect'
                })
            }
            const access_token = await genneralAccessToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })
            const refresh_token = await genneralRefreshToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                access_token,
                refresh_token
            })

        } catch (e) {
            reject(e)
        }
    })
}
const updateUser = (id, data) => {

    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id
            })

            if (checkUser === null) {
                resolve({
                    status: 'Error',
                    message: 'the user is not definded'
                })
            }
            const updatedUser = await User.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedUser
            })

        } catch (e) {
            reject(e)
        }
    })
}
const deleteUser = (id) => {

    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id
            })

            if (checkUser === null) {
                resolve({
                    status: 'OK',
                    message: 'the user is not definded'
                })
            }
            await User.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Delete user success',
            })

        } catch (e) {
            reject(e)
        }
    })
}
const deleteManyUser = (ids) => {

    return new Promise(async (resolve, reject) => {
        try {
            await User.deleteMany({ id: ids })
            resolve({
                status: 'OK',
                message: 'Delete user success',
            })

        } catch (e) {
            reject(e)
        }
    })
}
const getAllUser = (id) => {

    return new Promise(async (resolve, reject) => {
        try {
            const allUser = await User.find()
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: allUser
            })

        } catch (e) {
            reject(e)
        }
    })
}
const getDetailsUser = (id) => {

    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({
                _id: id
            })
            if (user === null) {
                resolve({
                    status: 'OK',
                    message: 'the user is not definded'
                })
            }
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: user
            })

        } catch (e) {
            reject(e)
        }
    })
}




module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    deleteManyUser,
    getDetailsUser
}