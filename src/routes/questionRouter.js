import express from 'express'
import { createQuestion } from '../controllers/questionController.js'

const questionRoute = express.Router()


questionRoute.post("/",createQuestion)

export default questionRoute;