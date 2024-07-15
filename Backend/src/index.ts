import express from "express";
import cors from 'cors';
import postRoute from './routes/post';
import signupRoute from './routes/signup';
import signinRoute from './routes/signin';
import  profileRoute from './routes/profile';
import likeRoute from "./routes/like"
import likedPostRoute from "./routes/likedPost"
import savedRoute from  "./routes/saved"
import editProfile from "./routes/Editprofile"
import userRoute from "./routes/user"
import followrequest from "./routes/followrequest"
import explore from "./routes/explore"
import  getFollowing from "./routes/getFollowing"
import getFollowers from "./routes/getFollwers"
const app = express();
const port = 3000;

app.use(cors()); // Use CORS middleware for cross-origin requests

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

// Assuming you want to parse JSON in your routes
app.use(express.json());

app.listen(port, () => {
    console.log(`Connected to port ${port}`);
});

app.use('/post', postRoute);
app.use('/signup', signupRoute) ;
app.use('/signin', signinRoute) ;
app.use('/profile', profileRoute) ;
app.use('/like', likeRoute) ;
app.use('/likedPost', likedPostRoute) ;
app.use('/saved', savedRoute) ;
app.use('/editprofile', editProfile) ;
app.use('/user' ,userRoute)
app.use('/followrequest' ,followrequest)
app.use('/explore' ,explore)
app.use('/getFollowers', getFollowers)
app.use('/getFollowing' , getFollowing)