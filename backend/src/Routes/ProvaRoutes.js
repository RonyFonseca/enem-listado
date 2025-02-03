import express from "express" 
import ProvaController from "../Controller/ProvaController.js"

const router  = express.Router()

router.get("/", ProvaController.getAllProva)
router.post("/create", ProvaController.createProva)
router.get("/listing/:id", ProvaController.listing)

export default router