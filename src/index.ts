import express from "express";
import routes from './routes/index';
import prisma from "./config/prisma.client";
import helmet from 'helmet';
import compression from 'compression';

// Initialize Server
const app = express();
app.listen(3000, (err) => {
    if(err)
        console.log("App listen error", err);
    else
        console.log("Server is running 3000");
});

// Ensure Database connection
prisma.$connect().then(() =>{
    console.log("Database connected successfully")
}).catch((err: any) =>{
    console.log("Database connection err:", err.message)
})

app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/v1',routes)

