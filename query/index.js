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

const PORT = process.env.PORT || 3003
const URL_POST_SERVICE = 'http://localhost:3001/events';
const URL_COMMENT_SERVICE = 'http://localhost:3002/events';
const URL_QUERY_SERVICE = 'http://localhost:3003/events';

// memory db
const posts = {}
// example
// {
//   'kjdkfkjdf': {
//     id: 'kjdkfkjdf',
//       content: 'this is first post',
//         comments: [
//           {
//             id: '.khjkdfd112',
//             content: 'this is comment',
//             status: 'pending',
//           }
//         ]
//   }
// }

app.get('/posts', (req, res) => {
  res.status(httpStatusCode.OK).json({
    code: httpStatusCode.OK,
    data: posts
  })
})


app.post('/events', (req, res) => {
  const data = req.body;

  if (data.type === 'PostCreated') {
    const { id, content } = data.data;
    posts[id] = {
      id,
      content,
      comments: []
    };
  }

  if (data.type === 'CommentCreated') {
    const { id, content, status, post_id } = data.data;

    posts[post_id].comments.push({
      id,
      content,
      status
    });
  }

  if (data.type === 'CommentUpdated') {
    const { id, content, status, post_id } = data.data;

    const listOldComments = posts[post_id].comments;

    const comment = listOldComments.find(comment => comment.id === id);
    comment.status = status;
    comment.content = content;

  }

  console.log('query sv ', posts);

  res.status(httpStatusCode.OK).json({
    code: httpStatusCode.OK,
    data: true
  });
})

app.listen(PORT, () => {
  console.log("event-bus is running on port ", PORT);
})