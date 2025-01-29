import express from "express" 
import dotenv from "dotenv"
import cors from "cors"

import UserRouter from "./Routes/UserRoutes.js"
import ProvaRouter from "./Routes/ProvaRoutes.js"
const app = express()
app.use(cors())
app.use(express.json())
dotenv.config()

// ROTAS
app.use("/user", UserRouter)
app.use("/prova", ProvaRouter)

app.listen(4000)
