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



console.log(process.env.DB_pass);

const uri = `mongodb+srv://${process.envDB_user}:${process.env.DB_pass}@cluster0.bomlehy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // await client.connect();
        const productCollection = client.db("productPlus").collection('product')
       

        // await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('productPlus-Backend')
});

app.listen(port, () => {
    console.log(`productPlus-Backend server is running on port: ${port}`);
})
