const auth = require("json-server-auth");
const jsonServer = require("json-server");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 9000;

// Bind the router db to the app
server.db = router.db;

server.use(middlewares);

const rules = auth.rewriter({
  users: 640,
  // videos: 660,
  // messages: 660,
});

// Custom middleware to delay responses by 800 ms
const delayMiddleware = (req, res, next) => {
  setTimeout(() => {
    next();
  }, 800); // 800 ms delay
};

server.use(rules);
server.use(auth);
server.use(delayMiddleware);
server.use(router);

server.listen(port);
