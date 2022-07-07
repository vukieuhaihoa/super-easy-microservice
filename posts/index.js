import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import crypto from 'crypto';
import httpStatusCode from 'http-status';
import cors from 'cors'
const app = express()

// read data from req => parser to req.body
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// logging middleware
app.use(morgan('dev'))

// cors
app.use(cors())

const PORT = process.env.PORT || '3001'

// memory storage
const posts = {}

app.get("/ping", (req, res) => {
  res.json({
    service: "posts",
    message: "pong"
  })
})

app.post("/posts", (req, res) => {
  const id = crypto.randomUUID()
  const { content } = req.body
  posts[id] = {
    id,
    content,
  }
  res.status(httpStatusCode.CREATED).json({
    "code": httpStatusCode.CREATED,
    "data": null
  })
})

app.get("/posts", (req, res) => {
  res.status(httpStatusCode.OK).json({
    "code": httpStatusCode.OK,
    "data": posts
  })
})

app.listen(PORT, () => {
  console.log('posts-service is running on port', PORT);
})