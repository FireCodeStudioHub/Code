const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/vulnerable_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define a user schema
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});

const User = mongoose.model("User", userSchema);

app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        // Directly parsing the request body to create the query object - DELIBERATELY UNSAFE
        const query = { username: username, password: password };

        const user = await User.findOne(query);

        if (user) {
            res.status(200).json({ message: "Login successful!" });
        } else {
            res.status(401).json({ message: "Login failed!" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
