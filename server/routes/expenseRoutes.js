const express = require("express");

const{
    createExpense,
    getExpenses,
    deleteExpense,
    updateExpense,
} = require("../controllers/expenseController");

const{protect} = require("../middleware/authMiddleware");

const router = express.Router();

//Protected routes
router.post("/", protect, createExpense);

router.get("/", protect, getExpenses);

router.delete("/:id", protect, deleteExpense);

router.patch("/:id", protect, updateExpense);

module.exports = router;