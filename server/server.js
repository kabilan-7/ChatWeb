import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';
import { connectdb } from './config/db.js';
import authRoute from './routes/authRoute.js';
import contactRoutes from './routes/contactsRoute.js';
import setupSocket from './socket.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: [process.env.ORIGIN],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
}));


// Serve static files for profiles
app.use("/uploads/profiles", express.static(path.resolve('uploads/profiles')));

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/contacts",contactRoutes)

connectdb();

const server = app.listen(port, () => {
    console.log(`The server is running at http://localhost:${port}`);
});

setupSocket(server)
