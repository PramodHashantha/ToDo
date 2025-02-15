import List from "../models/List.js";
import User from "../models/User.js";

//create
export const addTask = async (req, res, next) => {
    try {
        const {title, body, id} = req.body;
        const existingUser = await User.findById(id);
        if(existingUser) {
            const list = new List({
                title: title,
                body: body,
                user: existingUser._id,
            })
            await list.save().then(()=>res.status(200).json({list}));
            existingUser.Lists.push(list);
            await existingUser.save();
        }
        res.status(200).json(savedTask);
    } catch (err) {
        next(err);
    }
};

//update
export const updateTask = async (req, res, next) => {
    try {
        const { title, body } = req.body;
        const updatedList = await List.findByIdAndUpdate(
            req.params.id, 
            { title, body }, 
            { new: true } // Ensures you get the updated document
        );

        if (!updatedList) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({ message: "Task Updated", updatedList });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};


//delete
export const deleteTask = async (req, res, next) => {
    try {
        const {id} = req.body;
        const existingUser = await User.findByIdAndUpdate(id,{$pull:{list:req.params.id}});
        if(existingUser) {
            await List.findOneAndDelete(req.params.id).then(()=>res.status(200).json({message:"Task Deleted"}));
        }
    } catch (err) {
        console.log(err);
    }
};

//get
export const getTask = async (req, res, next) => {
    try {  
            const list = await List.find({user:req.params.id}).sort({createdAt:-1});
            if(list.length !== 0) {
                res.status(200).json({list:list});
            }else {
                res.status(200).json({message:"No Task Found"});
            }
        
    } catch (err) {
        next(err);
    } 
}