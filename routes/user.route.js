const{Router}=require("express")
const { signup, login } = require("../controllers/user.controller")
const URoute=Router()

URoute.post("/signup",signup)
URoute.post("/login",login)

module.exports=URoute