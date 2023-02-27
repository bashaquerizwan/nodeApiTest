// IMPORT EXPRESS SERVER
const express = require("express");

// Creating connection between mongodb and express.
require("./DBConnect/connection");


const Library = require("./Models/library");

//The express() syntax is the equivalent of saying new express(). 
//It creates a new instance of express that you can assign to a variable.
const app = express();

app.use(express.json());

// TO PROVIDE NEW PORT FOR HOSTING
// It will assign new a new port for hosting.
const port = process.env.PORT || 4000;

app.get("", (req, res) => {
    res.send("Hello! I'm Jahangir Alom");
})

// CREATE LIBRARY BOOK COLLECTION
// Insert documents/record.
app.post("/library", async (req, res) => {
    try{
        const user = new Library(req.body);
        const creatUser = await user.save()
        res.status(201).send(creatUser);

    }catch(e){
        res.status(400).send(e);
    }
})


// GETTEING LIBRARY BOOK COLLECTION
// Getting Details/record
app.get("/library", async (req, res) => {
    try{
        const libraryData = await Library.find();
        res.status(201).send(libraryData);
    }
    catch{
        res.send(e);
    }
})

// GETTEING LIBRARY BOOK COLLECTION
// Getting Individuals book Details/record by author name
app.get("/library/:bookauthor", async (req, res) => {
    try{
        const bookauthor = req.params.bookauthor;
        const libData = await Library.find({bookauthor});
        if(!libData){
            return res.status(404).send();
        }else{
            res.send(libData);
        }
    }
    catch{
        res.send(e);
    }
})

// GETTEING LIBRARY BOOK COLLECTION
// Getting Individuals book Details/record by Bookgenre name
app.get("/library/:bookgenre", async (req, res) => {
    try{
        const bookgenre = req.params.bookgenre;
        console.log(req.params.bookgenre);
        const data = await Library.find(req.params.bookgenre);
        if(!data){
            return res.status(404).send();
        }else{
            res.send(data);
        }
    }
    catch{
        res.send(e);
    }
})

// DELETING LIBRARY BOOK COLLECTION
// Deleting record from the libraray data
app.delete("/library/:id", async (req, res) =>{
    try{
        const _id = req.params.id;
        const libdel = await Library.findByIdAndDelete(req.params.id);
        if(!libdel){
            res.status(404).send();
        }else{
            res.send(libdel);
        }
    }catch{
        res.send(e);
    }
})


// UPDATE BOOK DETAILS BY ID 
// Updating the book details by their id
app.patch("/library/:id", async (req, res) =>{
    try{
        const _id = req.params.id;
        const updatebook = await Library.findByIdAndUpdate(_id,req.body,);
        res.status(200).send(updatebook);
    }catch{
        res.status(404).send(e);
    }
})

// START THE EXPRESS SERVER. 8000 is the PORT NUMBER
app.listen(port, () =>{
    console.log(`connection is setup at ${port}`);
})
