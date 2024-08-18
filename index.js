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
            "http://localhost:5174",
            "https://productplus-1.web.app",
            "https://productplus-1.firebaseapp.com",
        ],
        credentials: true,
    })
);
app.use(express.json());



console.log(process.env.DB_user);

const uri = `mongodb+srv://${process.env.DB_user}:${process.env.DB_pass}@cluster0.bomlehy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
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

        const addedCollection = client.db("productPlus").collection('addProduct')

        app.get('/productRange', async (req, res) => {
            let query = {}
            if (req.query?.range) {
                query = { range: req.query.range }
            }
            const result = await productCollection.find(query).toArray();
            res.send(result)
        });

        app.get('/productBrand', async (req, res) => {
            let query = {}
            if (req.query?.brand) {
                query = { brand: req.query.brand }
            }
            const result = await productCollection.find(query).toArray();
            res.send(result)
        });

        app.get('/productCategory', async (req, res) => {
            let query = {}
            if (req.query?.category) {
                query = { category: req.query.category }
            }
            const result = await productCollection.find(query).toArray();
            res.send(result)
        });

        app.get('/productFind', async (req, res) => {
            let query = {}
            if (req.query?.name) {
                query = { name: req.query.name }
            }
            const result = await productCollection.find(query).toArray();
            res.send(result)
        });
        app.get('/products', async (req, res) => {
            const page = parseInt(req.query.page);
            const size = parseInt(req.query.size);
            // console.log('pagination query', page, size);
            const result = await productCollection.find()
                .skip(page * size)
                .limit(size)
                .toArray();
            res.send(result);
        })

        app.post('/productByIds', async (req, res) => {
            const ids = req.body;
            const idsWithObjectId = ids.map(id => new ObjectId(id))
            const query = {
                _id: {
                    $in: idsWithObjectId
                }
            }
            const result = await productCollection.find(query).toArray();
            res.send(result)
        })

        app.get('/productsCount', async (req, res) => {
            const count = await productCollection.estimatedDocumentCount();
            res.send({ count });
        })

        // additional add product
        app.post('/addProduct', async (req, res) => {
            const newProduct = req.body;
            const result = await addedCollection.insertOne(newProduct);
            res.send(result);
        })

        app.get("/addProduct/:email", async (req, res) => {
            const email = req.params.email;
            const query = { "user.email": email };
            const result = await addedCollection.find(query).toArray();
            res.send(result);
        });
        // delete
        app.delete("/deleteProduct/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await addedCollection.deleteOne(query);
            res.send(result);
        });




        // await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('productPlus-Backend...')
});

app.listen(port, () => {
    console.log(`productPlus-Backend server is running on port: ${port}`);
})
