const express = require("express");
const router = require("./routers/index");
const connectDatabase = require("./helpers/database/connectDatabase");
const customErrorHandler = require("./middlewares/CustomErrorHandler");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/",(req,res)=>{
    res.send("makeplan express api");
})
connectDatabase();
app.use(cors());
app.use(express.json());
app.use("/",router);
app.use(customErrorHandler);

app.listen(PORT, ()=>{
    console.log("Server Started on", PORT);
})