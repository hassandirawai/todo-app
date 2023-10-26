import dotenv from "dotenv";
dotenv.config({ path: "./config.env" })
import express from "express"
import cors from "cors"
import connection from "./connection.js"
import getTodos from "./routes/todoRoute.js";

const app = express()
app.use(express.json())
app.use(cors())

connection.on("error", (error) => {
    console.log(`message: ${error.message}`)
})

connection.once("connected", () => {
    // create the server and listen to the req
    app.listen(process.env.PORT,() => {
        console.log("Todo api says hello👋")
    })
})

app.use("/todos", getTodos)