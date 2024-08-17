const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express()
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

app.use(
    cors({
        origin: [
            "http://localhost:5173",

        ],
        credentials: true,
    })
);
app.use(express.json());






app.get('/', (req, res) => {
    res.send('FilterShop-Backend')
});

app.listen(port, () => {
    console.log(`FilterShop-Backend server is running on port: ${port}`);
})
