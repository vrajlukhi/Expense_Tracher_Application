const express=require("express")
const cookie=require("cookie-parser")
const URoute = require("./routes/user.route")
const connect = require("./config/db")
const ERoute = require("./routes/expense.route")
require("dotenv").config()
const app=express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookie())

app.use("/user",URoute)
app.use("/expense",ERoute)

app.listen(process.env.PORT,()=>{
    console.log(`Server start ${process.env.PORT}`)
    connect()
})