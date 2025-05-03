const { User, validate } = require('../models/user');
const router = require('express').Router();
const bcrypt = require('bcryptjs');

router.post("/", async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }

        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).send({ message: "User already registered" });
        }

        const salt = await bcrypt.genSalt(Number(process.env.SALT) || 10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const user = new User({ ...req.body, password: hashedPassword });
        await user.save();
        
        const token = user.generateAuthToken();
        res.status(201).send({ data: token, message: "User created successfully" });

    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

module.exports = router;