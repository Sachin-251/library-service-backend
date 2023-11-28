import Book from "../models/bookModel.js";

export const addbook = async (request, response) => {
    try {

        const {title, author, publishYear} = request.body;

        if(
            !title ||
            !author ||
            !publishYear
        ) {
            return response.status(400).send({message: "Send all required fields!!!"});
        }

        const newBook = new Book({
            title,
            author,
            publishYear,
        });

        const savedBook = await newBook.save();

        return response.status(201).send(savedBook);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
}

export const allbooks = async (request, response) => {
    try {
        const books = await Book.find({});

        return response.status(200).json({
            count: books.length,
            data: books,
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
}

export const getbook = async (request, response) => {
    try {
        const { id } = request.params;
        const book = await Book.findById(id);

        return response.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
}

export const updatebook = async (request, response) => {
    try {
        const {title, author, publishYear} = request.body;

        if(
            !title ||
            !author ||
            !publishYear
        ) {
            return response.status(400).send({message: "Send all required fields!!!"});
        }
        const { id } = request.params;
        const result = await Book.findByIdAndUpdate(id, request.body);

        if(!result){
            return response.status(404).json({message: 'Book not Found!'});
        }

        return response.status(200).json({message: 'Book updated successfully!'});
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
}

export const deletebook = async (request, response) => {
    try {
        const { id } = request.params;

        const result = await Book.findByIdAndDelete(id);

        if(!result){
            return response.status(404).json({message: 'Book not Found!'});
        }

        return response.status(200).json({message: 'Book Deleted successfully!'});
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
}