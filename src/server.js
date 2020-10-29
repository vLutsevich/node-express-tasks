const { PORT, MONGO_CONNECTION_STRING } = require('./common/config');
const app = require('./app');
const mongoose = require('mongoose');
// const { createInitialEntities } = require('./utils/create-initial-entities');
const { createAdmin } = require('./utils/create-admin');

mongoose.connect(MONGO_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.once('open', () => {
  console.log('Data base connected');
  db.dropDatabase();
  createAdmin();
  // createInitialEntities();

  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
});
