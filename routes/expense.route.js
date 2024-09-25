const {Router} = require("express")
const { addExpense, bulkUpload, getExpenses, updateExpense, deleteExpenses, getTotalExpensesPerMonth, getCategoryBreakdown } = require("../controllers/expense.controller")
const { uploadCSV } = require("../utils/csvUpload")
const { Auth } = require("../middleware/auth")
const ERoute = Router()

ERoute.post("/add" , Auth ,addExpense)
ERoute.post('/bulk-upload', uploadCSV.single('file'), Auth , bulkUpload);
ERoute.get("/getdata" , Auth ,getExpenses)
ERoute.patch("/update/:id" , Auth , updateExpense)
ERoute.delete("/delete" , Auth , deleteExpenses)
ERoute.get("/total",Auth , getTotalExpensesPerMonth)
ERoute.get("/breakdown" ,Auth, getCategoryBreakdown)
module.exports = ERoute