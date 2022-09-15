// const knex = require('../models/knex');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {user} = require('../models');

// const {json} = 


exports.addUser = async(req, res) => {
    try {
        const {firstName, lastName, username, email, password} = req.body;

        // console.log(req.body);

        const hashedPassword = bcrypt.hashSync(password, 8);
        let insertUser = await user.create({
            firstName: firstName,
            lastName: lastName,
            username: username,
            email: email,
            password: hashedPassword
        })

        return res.status(200).send({
            message: 'register success',
            data: insertUser
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: error,
            code: 500
        })
    }
}

exports.getAllUsers = async(req, res) => {
    try {
        const data = await user.findAll()

        return res.status(200).send({
            message: 'Success',
            data: data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: error,
            code: 500
        })
    }
}

exports.getUserById = async(req, res) => {
     try {
        const id = req.params.id //Ngambil id 
        // console.log(id);

        const data = await user.findOne({
            where: {
                id: id
            }
        })

        if (!data) {
            return res.status(404).send({
                message: "Data Not Found"
            })
        }

        return res.status(200).send({
            message: 'Success',
            data: data
        })
     } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: error,
            code: 500
        })
     }
}

exports.updateUser = async(req, res) => {
    try {
        const id = req.params.id;
        const {firstName, lastName, email} = req.body;
        // console.log(req.body);

        const data = await user.findOne({
            where: {
                id: id
            }
        })

        if (!data) {
            return res.status(404).send({
                message: "Data Not Found"
            })
        }


        const updateData = await user.update(
            {
                firstName: firstName,
                lastName: lastName,
                email: email
            },
            {
                where:{
                  id: id  
                }
            }
        )

        return res.status(201).send({
            message: 'Updated Success',
            data: updateData
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: error,
            code: 500
        })
    }
}

exports.deleteUser = async(req,res) => {
    try {
        const id = req.params.id;
        // console.log(id)

        const data = await user.findOne({
            where: {
                id: id
            }
        })

        if (!data) {
            return res.status(404).send({
                message: "Data Not Found"
            })
        }

        const deleteUser = await user.destroy({
            where: {
                id: id
            }
        })

        return res.status(201).send({
            message: 'Delete Success',
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: error,
            code: 500
        });
    }
}