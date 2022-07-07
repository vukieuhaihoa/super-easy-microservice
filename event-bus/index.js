import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';
import httpStatusCode from 'http-status';
import morgan from 'morgan';
import axios from 'axios';

const app = express()

// read data from req => parser to req.body
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// logging middleware
app.use(morgan('dev'))

// cors
app.use(cors())


const PORT = process.env.PORT || 4000
const URL_POST_SERVICE = 'http://localhost:3001/events';
const URL_COMMENT_SERVICE = 'http://localhost:3002/events';
const URL_QUERY_SERVICE = 'http://localhost:3003/events';

app.post('/events', (req, res) => {
  const event = req.body

  axios.post(URL_POST_SERVICE, event)
  axios.post(URL_COMMENT_SERVICE, event)
  axios.post(URL_QUERY_SERVICE, event)

  res.status(httpStatusCode.OK).json({
    code: httpStatusCode.OK,
    data: true
  })
})

app.listen(PORT, () => {
  console.log("event-bus is running on port ", PORT);
})