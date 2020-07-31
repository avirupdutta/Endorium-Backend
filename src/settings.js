module.exports = {
  DATABASE_URL: `mongodb+srv://${process.env.dbUsername}:${process.env.dbPassword}@cluster0.c9lka.mongodb.net/${process.env.dbName}?retryWrites=true&w=majority`,
};
