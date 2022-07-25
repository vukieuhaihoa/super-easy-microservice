import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import crypto from 'crypto';
import httpStatusCode from 'http-status';
import cors from 'cors';
import axios from 'axios';

const app = express()

// read data from req => parser to req.body
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// logging middleware
app.use(morgan('dev'))

app.use(cors())
const PORT = process.env.PORT || '3002'
// const URL_EVENTBUS = 'http://localhost:4000/events';
const URL_EVENTBUS = 'http://event-bus-srv:4000/events';


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
app.post("/posts/:post_id/comments", async (req, res) => {
  const id = crypto.randomUUID()
  const { post_id } = req.params
  const { content } = req.body
  // check if exist or not
  const comment = comments[post_id] || []
  comment.push({
    id,
    content,
    status: 'pending'
  })

  comments[post_id] = comment

  // emit event
  await axios.post(URL_EVENTBUS, {
    type: "CommentCreated",
    data: {
      post_id,
      id,
      content,
      status: 'pending',
    }
  })

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
  const data = comments[post_id] || []
  res.status(httpStatusCode.OK).json({
    code: httpStatusCode.OK,
    data
  })
})

/**
 * consumer event or listen event
 */
app.post("/events", async (req, res) => {
  const data = req.body;
  console.log("comment-service received event ", data.type);

  if (data.type === 'CommentModerated') {
    const { id, content, status, post_id } = data.data;

    const listOldComments = comments[post_id];

    const comment = listOldComments.find(comment => comment.id === id);
    comment.status = status;

    console.log('comment sv ', comments);

    await axios.post(URL_EVENTBUS, {
      type: 'CommentUpdated',
      data: {
        post_id,
        id,
        content,
        status,
      }
    })
  }

  res.status(httpStatusCode.OK).json({
    "code": httpStatusCode.OK,
    "data": true
  })
})

app.listen(PORT, () => {
  console.log('comments-service is running on port', PORT);
})