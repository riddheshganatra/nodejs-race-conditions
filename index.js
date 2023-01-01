const express = require('express')
var bodyParser = require('body-parser')
const { MongoClient } = require('mongodb');

// const uri = "mongodb+srv://<username>:<password>@<your-cluster-url>/test?retryWrites=true&w=majority";
const uri = "mongodb://localhost:27017/newsletter";

const client = new MongoClient(uri);

const app = express()
const port = 3000

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World to Race Conditions')
})


app.post('/v1/register', async (req, res) => {
  try {
    // find if user is already registered
    let user = await client.db("newsletter").collection("usersV1").findOne({email:req.body.email})

    if (user) {
      return res.json({ message: `user already registered` })
    }

    // adding this line makes easy to test parallel requests from same user
    await wait(10000)

    const result = await client.db("newsletter").collection("usersV1").insertOne({email:req.body.email});

    res.json({ message: `user registered successfully` })
  } catch (error) {
    console.log(error)
    res.json({ message: error.message })
  }
})

app.post('/v2/register', async (req, res) => {
  try {
    const result = await client.db("newsletter").collection("usersV2").insertOne({email:req.body.email});
    res.json({ message: `user registered successfully` })
  } catch (error) {
    console.error(error.message)
    res.json({ message: error.message })
  }
})



function wait(timeout) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, timeout);
  })
}

client.connect().then(async () => {
  console.log(`connected to DB`);

  await client.db("newsletter").collection("usersV2").createIndex({ email: 1 }, { unique: true })

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
})