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

const PORT = process.env.PORT || '3004'

app.get("/ping", (req, res) => {
  res.json({
    service: "posts",
    message: "pong"
  })
})

const URL_EVENTBUS = 'http://localhost:4000/events';


app.post("/events", async (req, res) => {
  const data = req.body;

  if (data.type === 'CommentCreated') {
    const { id, content, post_id } = data.data;

    const status = content.includes('cac') ? 'rejected' : 'approved';

    await axios.post(URL_EVENTBUS, {
      type: 'CommentModerated',
      data: {
        post_id,
        id,
        content,
        status,
      }
    })

  }

  console.log("moderation-service received event ", data.type);
  res.status(httpStatusCode.OK).json({
    "code": httpStatusCode.OK,
    "data": true
  })
})

app.listen(PORT, () => {
  console.log('moderation-service is running on port', PORT);
})