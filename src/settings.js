const devMode = false;

module.exports = {
  DATABASE_URL: devMode
    ? `mongodb://localhost:27017/Endorium?retryWrites=true&w=majority`
    : `mongodb+srv://${process.env.dbUsername}:${process.env.dbPassword}@cluster0.c9lka.mongodb.net/${process.env.dbName}?retryWrites=true&w=majority`,
};
