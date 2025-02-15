import mongoose from "mongoose"; // Corrected import
const { Schema } = mongoose;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    lists: { // Changed to lowercase and made it an array
        type: [mongoose.Schema.Types.ObjectId], // Array of ObjectIds
        ref: "List"
    }
});

export default mongoose.model("User", UserSchema);