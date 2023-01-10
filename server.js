import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app.js';

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

const PORT = process.env.PORT || 3030;

// const connectionString = process.env.AZURE_DATABASE_CONNECTION_STRING
const connectionString = process.env.MONGODB_URI;

mongoose.set('strictQuery', false);

/* Connecting to the database and then starting the server. */
mongoose
    .connect(connectionString)
    .then(() => {
        app.listen(PORT, console.log('Server started on port 3030'));
    })
    .catch((err) => {
        console.log('Database problem occured!');
        console.log(err);
    });
