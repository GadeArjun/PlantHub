const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const routes = require('./routes'); // Your route logic
const { typeDefs, resolvers } = require('./schemas'); // Your GraphQL schemas and resolvers
const { authMiddleware } = require('./utils/auth'); // Your authentication middleware

const mongooseConnection = require('./config/connection'); // MongoDB connection function

const PORT = process.env.PORT || 3001;

const app = express();

// Serve up static assets
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Apollo Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(routes);

// Connect to MongoDB
mongooseConnection().then(() => {
  // Start the Express server only after the MongoDB connection is established
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
