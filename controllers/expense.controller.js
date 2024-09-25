const fs = require("fs")
const path = require("path")
const csvParser = require("csv-parser");
const { cacheData } = require("../utils/caching");
const Expense = require("../models/expense.Schema");


const addExpense = async (req, res) => {
    try {
        const { amount, category, paymentMethod, date } = req.body;
        const expense = await Expense.create(req.body);
        res.status(201).json({ success: true, expense });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};


const bulkUpload = async (req, res) => {

    const expenses = [];

    try {
        fs.createReadStream(req.file.path)
            .pipe(csvParser())
            .on('data', (data) => {
                expenses.push({...data , userID : req.body.userID });
            })
            .on('end', async () => {
                await Expense.insertMany(expenses);
                res.status(200).json({ success: true, message: 'Bulk expenses added successfully' });
            });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

const getExpenses = async (req, res) => {
    let { category, paymentMethod,startDate , endDate , sortBy = 'date', order = 'desc', page = 1, limit = 10 } = req.query;

    try {
        let filters = {};
        if (category) filters.category = category;
        if (paymentMethod) filtersser : req.body.paymentMethod = paymentMethod;
        if (startDate || endDate) {
            filters.date = {};
            if (startDate) filters.date.$gte = new Date(startDate);
            if (endDate) filters.date.$lte = new Date(endDate);
          }
        
        

        const expenses = await cacheData(`expenses:${JSON.stringify(filters)}:${page}`, async () => {
            return Expense.find(filters)
                .sort({ [sortBy]: order === 'desc' ? -1 : 1 })
                .skip((page - 1) * limit)
                .limit(Number(limit));
        });

        res.status(200).json(expenses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

}

const updateExpense = async (req, res) => {
    try {
      const expense = await Expense.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
      if (!expense) return res.status(404).json({ success: false, message: 'Expense not found' });
      res.status(200).json({ success: true, expense });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  };

  const deleteExpenses = async (req, res) => {
    try {
      const ids = req.body.ids;
      await Expense.deleteMany({ _id: { $in: ids } });
      res.status(200).json({ success: true, message: 'Expenses deleted successfully' });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  };

  const getTotalExpensesPerMonth = async (req, res) => {
    try {
      const result = await Expense.aggregate([
        {
          $match: {}
        },
        {
          $group: {
            _id: { $month: "$date" }, 
            totalAmount: { $sum: "$amount" },  
            totalExpenses: { $sum: 1 }  
          }
        },
        {
          $sort: { _id: 1 } 
        }
      ]);
      
      console.log(result)
      res.status(200).json({
        success: true,
        data: result
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        error: err.message
      });
    }
  };

  const getCategoryBreakdown = async (req, res) => {
    try {
  
      const result = await Expense.aggregate([
        {
          $match: {}
        },
        {
          $group: {
            _id: "$category", 
            totalAmount: { $sum: "$amount" },
            totalExpenses: { $sum: 1 }  
          }
        },
        {
          $sort: { totalAmount: -1 }  
        }
      ]);
  
      res.status(200).json({
        success: true,
        data: result
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        error: err.message
      });
    }
  };
module.exports = { addExpense, bulkUpload ,  getExpenses , updateExpense , deleteExpenses , getTotalExpensesPerMonth , getCategoryBreakdown}