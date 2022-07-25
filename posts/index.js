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

// const URL_EVENTBUS = 'http://localhost:4000/events';
const URL_EVENTBUS = 'http://event-bus-srv:4000/events';

app.post("/posts/create", async (req, res) => {
  const id = crypto.randomUUID()
  const { content } = req.body
  posts[id] = {
    id,
    content,
  }

  // publish event
  await axios.post(URL_EVENTBUS, {
    type: 'PostCreated',
    data: {
      id,
      content
    }
  })

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

app.post("/events", (req, res) => {
  const data = req.body;
  console.log("post service received event ", data.type);
  res.status(httpStatusCode.OK).json({
    "code": httpStatusCode.OK,
    "data": true
  })
})

app.listen(PORT, () => {
  console.log('version: 0.0.1');
  console.log('posts-service is running on port', PORT);
})