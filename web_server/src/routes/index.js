const film = require('./Film');
const user = require('./User');
const Comment = require('./Comment');

const routes = (app) => {
  app.use('/films', film);
  app.use('/users/', user);
  app.use('/comments/', Comment);
};

module.exports = routes;
