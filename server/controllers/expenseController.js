const Expense = require("../models/Expense");

//create expense
exports.createExpense = async (req,res) => {
    try{
        const{
            title,
            amount,
            category,
            type,
        } = req.body;

        const expense = await Expense.create({
            user: req.user._id,
            title,
            amount,
            category,
            type,
        });

        res.status(201).json(expense);
    }
    catch(error){
        res.status(500).json({
            message: error.message,
        });
    }
};

//get user expences

exports.getExpenses = async(req,res) => {
    try{
        const expenses = await Expense.find({
            user: req.user._id,
        });

        res.json(expenses);
    }
    catch(error){
        res.status(500).json({
            message: error.message,
        });
    }
};

//delete user expence

exports.deleteExpense = async(req,res) => {
    try{
        const expense = await Expense.findById(req.params.id);

        if(!expense){
            return res.status(404).json({
                message: "Expense not found",
            });
        }

        //verify user owns expense
        if(expense.user.toString() !== req.user._id.toString()){
            return res.status(401).json({
                message: "Not authorized",
            });
        }

        await expense.deleteOne();

        res.json({
            message: "Expense deleted successfully"
        });
    }
    catch(error){
        res.status(500).json({
            message: error.message,
        });
    }
};

//Update user expense

exports.updateExpense = async(req,res) => {
    try {
        const { amount, title, category, type } = req.body;

        //Find expense AND update it in one step
        const expense = await Expense.findByIdAndUpdate(
        req.params.id,
        {
        $set: {
            amount,
            title,
            category,
            type,
        },
        },
        {
            new: true,       // return updated document
            runValidators: true, // enforce schema rules
        }
        );

        //Check if expense exists
        if (!expense) {
            return res.status(404).json({
            message: "Expense not found",
            });
        }

        //Ownership check (IMPORTANT for security)
        if (expense.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({
            message: "Not authorized",
            });
        }

        //Return updated expense
        res.json({
            message: "Expense updated successfully",
            expense,
        });
    }
    catch(error){
        res.status(500).json({
            message: error.message,
        });
    }
};