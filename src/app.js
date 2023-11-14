import express from "express";
import connectDatabase from "./config/dbConnect.js";
import book from "./models/Book.js";

const connection = await connectDatabase();

connection.on("error", (error) => {
    console.error("Error", error);
});

connection.once("open", () => { 
    console.log("Connection Succesfuly");
});

const app = express();
app.use(express.json());

const books = [
    {
        id: 1,
        title: "O senhor dos aneis"
    },
    {
        id: 2,
        title: "O Hobbit"
    },
    {
        id: 3,
        title: "O Hobbit"
    },

];

function searchById(id){
    return books.findIndex(book => {
        return book.id === Number(id);
    })
}

app.get("/", (req, res) => {
    res.status(200).send("Curso de node.js");
});

 app.get("/books", async (req, res) => {
    const bookList = await book.find({});
    res.status(200).json(bookList);
});

app.get("/books/:id", (req, res) => {
   const index = searchById(req.params.id);
   res.status(200).json(books[index]) 
});

app.put("/books/:id", (req, res) => {
   const index = searchById(req.params.id);
   books[index].title = req.body.title;
   res.status(200).json(books);

});

app.delete("/books/:id", (req, res) => {
   const index = searchById(req.params.id);
   books.splice(index, 1);
   res.status(200).json(books); 

});

app.post("/books", async (req, res) => {
    const bookList = await book.find({});

    bookList.push(req.body);
    res.status(201).send("Book registered successfully")
});



export default app;


