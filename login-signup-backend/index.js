import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/myLoginSignupDB", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("DB connected");
    } catch (err) {
        console.error("DB connection error:", err);
    }
};

connectDB();
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone: String
});
const User = new mongoose.model('User', userSchema)



app.post("/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const user = await User.findOne({ email, password });
        if (user) {
            res.send({ userId: user._id });
        } else {
            res.send("FAIL");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error logging in");
    }
});

app.post("/signup", async (req, res) => {
    const userdata = req.body;
    const newUser = new User(userdata);

    try {
        await newUser.save();
        res.send("User signup successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error creating user");
    }
});

app.get("/loggedusers", async (req, res) => {
    try {
        const userId = req.query.userId;
        const user = await User.findById(userId).select("email phone -_id");
        res.send(user);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching users");
    }
});

app.listen(8000, () => {
    console.log("Server started at port 8000");
});

