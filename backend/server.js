const express = require("express");
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const app = express();
const port = 3000;

// Connexion à la base de données

const uri = process.env.STRING_URI;



const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connectez le client au serveur (en option à partir de la v4.7)
    await client.connect();
    console.log("Connected");
  } catch (error) {
    console.error("Nop:", error);
  }
}

run()



// Récupération des données. 

app.get("/", async (_, res) => {
    try {
      const db = client.db("Genre");
      const collection = db.collection("Romance");
      const results = await collection.find().toArray();
      console.log(results);
      res.json(results);
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
      res.status(500).send("Erreur lors de la récupération des données");
    }
  });
  

// Ecoute 

app.listen(port, () => {
    console.log(`Le serveur est en cours d'exécution sur le port ${port}`);
  });