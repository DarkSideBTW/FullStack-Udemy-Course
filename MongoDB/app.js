import { MongoClient } from 'mongodb';
// Replace the uri string with your MongoDB deployment's connection string.
const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri);
async function run() {
  try {
    const database = client.db('fruitsDB');
    const fruits = database.collection('fruits');
    // create an array of documents to insert

    const find = await fruits.find({}).toArray();
    console.log(find);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
