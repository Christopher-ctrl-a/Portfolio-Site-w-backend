// christopher Esguerra server.js
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';


import contactRoutes from './serverBackend/routes/contactroutes.js';
import userRoutes from './serverBackend/routes/userroutes.js';


const app = express();

const PORT = 3000;
app.use(bodyParser.json());




mongoose.connect('mongodb+srv://christpheresguerra_db_user:<credentials>@cluster0.7tlgub7.mongodb.net/Skeleton');

mongoose.connection.once('open', () => {
 console.log('Connected to MongoDB');
 console.log('Using database:', mongoose.connection.db.databaseName);
 

});



 app.get("/", (req, res) => {
res.json({
  message: 'Hello, welcome to my portfolio application.',
});
});

app.use('/api/contacts', contactRoutes);
app.use('/api/users', userRoutes);


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));