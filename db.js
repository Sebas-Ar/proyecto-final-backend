import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = "mongodb+srv://xevazariasd:o6HI3tlQcwXdgSe2@curso-full-stack.nplza2v.mongodb.net/?retryWrites=true&w=majority&appName=Curso-Full-Stack"
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const dbClient = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export default dbClient


// async function run() {
//     try {
//       // Connect the client to the server	(optional starting in v4.7)
//       await client.connect();
//       // Send a ping to confirm a successful connection
//       await client.db("admin").command({ ping: 1 });
//       console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     } finally {
//       // Ensures that the client will close when you finish/error
//       await client.close();
//     }
//   }
//   run().catch(console.dir);