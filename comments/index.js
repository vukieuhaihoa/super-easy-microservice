import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import crypto from 'crypto';
import httpStatusCode from 'http-status';
import cors from 'cors';

const app = express()

// read data from req => parser to req.body
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// logging middleware
app.use(morgan('dev'))

app.use(cors())
const PORT = process.env.PORT || '3002'

// memory storage
const comments = {}

app.get("/ping", (req, res) => {
  res.json({
    service: "comment",
    message: "pong"
  })
})
/**
 * Create new comment on post by post id
 */
app.post("/posts/:post_id/comments", (req, res) => {
  const id = crypto.randomUUID()
  const { post_id } = req.params
  const { content } = req.body
  // check if exist or not
  const comment = comments[post_id] || []
  comment.push({
    id,
    content
  })

  comments[post_id] = comment

  res.status(httpStatusCode.CREATED).json({
    code: httpStatusCode.CREATED,
    data: null
  })
})

/**
 * Get all comments by post id
 */
app.get("/posts/:post_id/comments", (req, res) => {
  const { post_id } = req.params
  console.log(comments);
  const data = comments[post_id] || []
  res.status(httpStatusCode.OK).json({
    code: httpStatusCode.OK,
    data
  })
})

app.listen(PORT, () => {
  console.log('app is running on port', PORT);
})