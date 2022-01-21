// MAIN BACKEND FILE

const db = require("./database");
const express = require("express");
require('dotenv').config();
const app = express();
app.use(express.json());
// console.log(db.books);
// console.log(db.authors);
// console.log(db.publications);


const BookModel=require("./database/books");
const AuthorModel=require("./database/authors");
const PublicationModel=require("./database/publications");



//Import the mongoose module
var mongoose = require('mongoose'); 
//Set up default mongoose connection
var mongoDB = process.env.MONGO_URI;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>console.log("CONNECTION ESTABLISHED"));

// http://localhost:3000/
app.get("/", (req, res) => {
    return res.json({ "WELCOME": `to my Backend Software for the Book Company` });
});

// http://localhost:3000/books 
app.get("/books",async (req, res) => {
    const getAllBooks =await BookModel.find();
    return res.json(getAllBooks);
});

// http://localhost:3000/book-isbn/1234Three
app.get("/book-isbn/:isbn", async(req, res) => {
    // console.log(req.params);
    const { isbn } = req.params;
    // console.log(isbn);
    const getSpecificBook =await BookModel.findOne({ISBN:isbn});
    // console.log(getSpecificBook);
    // console.log(getSpecificBook.length);
    if (getSpecificBook === null) {
        return res.json({ "error": `No Book found for the ISBN of ${isbn}` });
    }
    return res.json(getSpecificBook);
});

// http://localhost:3000/book-category/programming
app.get("/book-category/:category", async(req, res) => {
    // // console.log(req.params);
    const { category } = req.params;
    // // console.log(isbn);
    const getSpecificBooks = await BookModel.find({category:category}) ;
    // // console.log(getSpecificBook);
    // // console.log(getSpecificBook.length);
    if (getSpecificBooks === null) {
        return res.json({ "error": `No Books found for the category of ${category}` });
    }
    return res.json(getSpecificBooks);
});

// http://localhost:3000/authors
app.get("/authors", async(req, res) => {
    const getAllAuthors = await AuthorModel.find();
    return res.json(getAllAuthors);
});

// http://localhost:3000/author-id/3
app.get("/author-id/:id", async(req, res) => {
    // console.log(req.params);
    let { id } = req.params;
    
    // console.log(id);
    const getSpecificAuthor = await AuthorModel.findOne({id:id});
    // console.log(getSpecificAuthor);
    
    if (getSpecificAuthor === null) {
        return res.json({ "error": `No Author found for the id of ${id}` });
    }
    return res.json(getSpecificAuthor);
});

// http://localhost:3000/author-isbn/1234Three
app.get("/author-isbn/:isbn",async (req, res) => {
    // console.log(req.params);
    let { isbn } = req.params;
    
    // console.log(id);
    const getSpecificAuthor = await AuthorModel.find({books:isbn});
    
    
    if (getSpecificAuthor.length === 0) {
        return res.json({ "error": `No Author found for the isbn of ${isbn}` });
    }
    return res.json(getSpecificAuthor);
});

// http://localhost:3000/publications
app.get("/publications", (req, res) => {
    const getAllPublications = db.publications;
    return res.json(getAllPublications);
});

// http://localhost:3000/publication-isbn/12345Two
app.get("/publication-isbn/:isbn", (req, res) => {

});



// http://localhost:3000/book
app.post("/book", async(req, res) => {
    // console.log(req.body);
    const addNewBook=await BookModel.create(req.body);
    
    return res.json({
        bookAdded:addNewBook,
        message:"book was added!!!"
    });
});

// http://localhost:3000/author
app.post("/author",async (req, res) => {
    // console.log(req.body);
    const addNewAuthor=await AuthorModel.create(req.body);
    
    return res.json({
        AuthorAdded:addNewAuthor,
        message:"Author was added!!!"
    });
});

// http://localhost:3000/publication
app.post("/publication", (req, res) => {
});

// http://localhost:3000/book-update/123Two
app.put("/book-update/:isbn",async (req, res) => {
    // console.log(req.body);
    // console.log(req.params);
    const { isbn } = req.params;
    const UpdateBook=await BookModel.findOneAndUpdate({ISBN:isbn},req.body,{new:true});
    
    return res.json({
        bookUpdated:UpdateBook,
        message:"book was updated!!!"
    });
});


// http://localhost:3000/Author-update/1
app.put("/Author-update/:id",async (req, res) => {
    const { id } = req.params;
    const UpdateAuthor=await AuthorModel.findOneAndUpdate({id:id},req.body,{new:true});
    
    return res.json({
        AuthorUpdated:UpdateAuthor,
        message:"Author was updated!!!"
    });
});
// http://localhost:3000/publication-update/1
app.put("/publication-update/:id", (req, res) => {

});
// http://localhost:3000/book-delete/123Two
app.delete("/book-delete/:isbn", async(req, res) => {
    // console.log(req.params);
    const { isbn } = req.params;
    const DeleteBook=await BookModel.deleteOne({ISBN:isbn});
    
    return res.json({
        bookDeleted:DeleteBook,
        message:"book was Deleted!!!"
    });
});
//http://localhost:3000/book-author-delete/12345Five/4
app.delete("/book-author-delete/:isbn/:id", async(req, res) => {
    // console.log(req.params);
    let { isbn, id } = req.params;
    let getSpecificBook =await BookModel.findOne({ISBN:isbn});
    
    if (getSpecificBook === null) {
        return res.json({ "error": `No Book found for the ISBN of ${isbn}` });
    }
    else{
        getSpecificBook.authors.remove(id);
        const UpdateBook=await BookModel.findOneAndUpdate({ISBN:isbn},getSpecificBook,{new:true});
    
    return res.json({
        bookUpdated:UpdateBook,
        message:"AUthor was deleted from the book!!!"
    });
        }
    
    // http://localhost:3000/author-book-delete/1/12345ONE
app.delete("/author-book-delete/:id/:isbn", (req, res) => {
});

// http://localhost:3000/author-delete/12345ONE
app.delete("/author-delete/:id", (req, res) => {
});

// http://localhost:3000/publication-delete/12345ONE
app.delete("/publication-delete/:id", (req, res) => {
});
});
app.listen(3000, () => {
    console.log("MY EXPRESS APP IS RUNNING.....")
}); 