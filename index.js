const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const typeDefs = require("./schema/Schema");
const resolvers = require("./resolvers/Resolvers");

const app = express();
app.use(cors());
app.use(express.json());

const server = new ApolloServer({ typeDefs, resolvers });

const startServer = async () => {
  await server.start();
  app.use("/graphql", expressMiddleware(server));

  mongoose
    .connect(
      "mongodb+srv://usmanbaig1572:Password@chatapp.dfkks5a.mongodb.net/ChatApp?retryWrites=true&w=majority&appName=ChatApp"
    )
    .then(() => console.log("Database Connected Successfully!"))
    .catch((err) => console.error("Database Connection Error:", err));

  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
