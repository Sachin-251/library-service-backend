import express, { response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bookRoutes from "./routes/books.js";
import cors from "cors";

//CONFIGURATIONS
dotenv.config();
const app = express();

//Middleware for parsing request body
app.use(express.json());

//Middleware for handling CORS policy
// app.use(cors()); //For allowing all origins

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}))

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send("Hello");
});

//ROUTES
//Add a book
app.use("/books", bookRoutes);

//Get all books or one book
app.use("/books", bookRoutes);

//Update a book
app.use("/book",bookRoutes);

//Delete a book
app.use("/book", bookRoutes);

const PORT = process.env.PORT || 5556;


//MONGOOSE SETUP
mongoose.connect(process.env.DB_URI)
    .then(() => {
        console.log("App Connected to Database");
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    })