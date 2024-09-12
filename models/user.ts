import { model, models, Schema } from "mongoose";

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already exists!'],
        required: [true, 'Email is required!']
    },
    username: {
        type: String,
        unique: [true, 'Username already exists!'],
        match: [/^[a-zA-Z0-9]{8,20}$/, 'Invalid username, it should contain 8-20 alphanumeric letters and be unique']
    },
    image: {
        type: String
    }
});

const User = models.User || model("User", UserSchema);

export default User;