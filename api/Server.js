
import express from 'express';
import colors from 'colors'
import dotenv from 'dotenv';
import userRouter from './Router/UserRouter.js'
import connectmongoDB from './Config/db.js';
import errorHandle from './Middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';

//path resolve
const __dirname = path.resolve();


// enviorment setup
const app = express();
dotenv.config();


// port create
let PORT = process.env.SERVER_PORT || 8080

// middleware init
app.use(express.json());
app.use(express.urlencoded({ extended : false }));
app.use(cookieParser());
app.use(cors());

app.use(express.static(path.join(__dirname, 'api/public')))


// router initalised

app.use('/api/v1/user' , userRouter);

// error handler
app.use( errorHandle );

// listning port
app.listen(PORT, () => {
    connectmongoDB();
    console.log(`Server running on port http://localhost:${PORT}`.bgMagenta.black)
})
