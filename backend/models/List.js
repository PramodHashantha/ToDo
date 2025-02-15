import mongoose from "mongoose"; // Corrected import
const { Schema } = mongoose;

const ListSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: Array,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, // Corrected reference
        ref: "User"
    }
}, { timestamps: true });

export default mongoose.model("List", ListSchema);