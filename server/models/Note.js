import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    color:{
        type: String,
        default: "white"
    }
});

export default mongoose.models.Note || mongoose.model('Note', NoteSchema)