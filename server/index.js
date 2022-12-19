import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import AuthRoute from './Routes/AuthRoute.js';
import UserRoute from './Routes/UserRoute.js';
import PostRoute from './Routes/PostRoute.js';
import MessageRoute from './Routes/MessageRoute.js';
import ChatRoute from './Routes/ChatRoute.js';
import cors from 'cors';
import UploadRoute from './Routes/UploadRoute.js';
// Routes

const port = process.env.PORT || 5000;
const app = express();

app.use(express.static('public'));
app.use('/images/', express.static('images'));

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
dotenv.config();

mongoose
  .connect(
    'mongodb+srv://Gabriel:gabriel.gs605@cluster0.zu6trkm.mongodb.net/?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => app.listen(port, () => console.log(`listening on port ${port}`)))
  .catch((error) => console.log(error));

// usage of Routes

app.use('/auth', AuthRoute);
app.use('/user', UserRoute);
app.use('/post', PostRoute);
app.use('/upload', UploadRoute);
app.use('/chat', ChatRoute);
app.use('/message', MessageRoute);
