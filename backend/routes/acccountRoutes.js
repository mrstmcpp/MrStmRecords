const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const AccountModel = require('../models/accountModel');
const getToken = require('../utils/helpers');

router.post('/register', async (req, res) => {
    try {
        const { email, firstName, lastName, password } = req.body;

        if (!email || !firstName || !lastName || !password) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        const existingUser = await AccountModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: 'User already exists.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new AccountModel({
            email,
            password: hashedPassword,
            firstName,
            lastName,
        });

        await newUser.save();

        const token = await getToken(email, newUser);

        const userToReturn = {
            ...newUser.toObject(),
            token,
        };
        delete userToReturn.password;

        return res.status(201).json(userToReturn);
    } catch (error) {
        console.error('Error during user registration:', error);

        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: 'Validation error.' });
        }

        if (error.name === 'MongoError' && error.code === 11000) {
            return res.status(409).json({ error: 'Duplicate key error.' });
        }

        return res.status(500).json({ error: 'Internal server error.' });
    }
});



router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const loginUser = await AccountModel.findOne({ email });
        if (!loginUser) {
            return res.status(401).json({ error: "Invalid credentials." });
        }

        const isPasswordRight = await bcrypt.compare(password, loginUser.password);
        if (!isPasswordRight) {
            return res.status(401).json({ error: "Invalid credentials." });
        }

        const token = await getToken(loginUser.email, loginUser);
        const userToReturn = { ...loginUser.toObject(), token };
        delete userToReturn.password;

        return res.status(200).json(userToReturn);
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
});

module.exports = router;
