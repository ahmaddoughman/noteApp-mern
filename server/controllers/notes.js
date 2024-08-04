import Note from "../models/Note.js";

export const getNotes = async (req,res) =>{

    const userId = req.userId;

    try{
        const notes = await Note.find({userId});
        res.json(notes);
    }catch(err){
        res.status(500).json({error: err.message});
    }
};

export const getNote = async (req,res) =>{
    try {
        const note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).json({message: "Note not found"});
        }
        res.status(200).json({
            success: true,
            data: note,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

export const createNote = async (req,res) =>{

    const userId = req.userId;

    try{
        const note = await Note.create({
            ...req.body, 
            userId
        });
        res.status(201).json({
            success: true,
            data: note,
        });
    }catch(err){
        res.status(500).json({
            success: false,
            error: err.message,
        });
    }
};

export const updateNote = async (req,res) =>{
    try {
        const note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).json({message: "Note not found"});
        }
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            success: true,
            data: updatedNote,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

export const deleteNote = async (req,res) =>{
    try {
        const note = await Note.findByIdAndDelete(req.params.id);
        if(!note){
            return res.status(404).json({message: "Note not found"});
        }
        res.status(200).json({
            success: true,
            data: {},
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
    
};