const createError = require("http-errors");
const express = require("express");
const session = require("express-session");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const passport = require("passport");
const Sequelize = require("sequelize");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const { conn } = require("./src/db");
const flash = require("connect-flash");

// const extendDefaultFields = (defaults, session) => {
//   return {
//     data: session.client,
//     expires: defaults.expires,
//     userId: session.userId,
//   };
// };

// const sequelize = new Sequelize(`${DB_LOCAL_URL}`, {
//   logging: false,
//   native: false,
//   table: "Session",
//   extendDefaultFields: extendDefaultFields,
// });

const indexRouter = require("./routes/index");

const app = express();

//passport config

/* `require("./src/config/client_passport")(passport);` is importing a module from the file
`client_passport.js` located in the `./src/config` directory and passing the `passport` object as an
argument to the exported function. This is likely configuring the passport authentication strategy
for the client. */
require("./src/config/client_passport")(passport);
require("./src/config/user_passport")(passport);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3002",
      "http://localhost:5173",
    ],
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    credentials: true,
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    key: "client_cookie",
    secret: "chisqueado0517",
    resave: false,
    saveUninitialized: false,
    store: new SequelizeStore({
      db: conn,
    }),
    cookie: {
      maxAge: 7200000, //2 hours
    },
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested, Content-Type, Accept"
//   );
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS, DELETE");
//   next();
// });

app.use("/", indexRouter);

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  console.log(err.stack);

  // render the error page
  res.status(err.status || 500);
  res.send(err.message);
});

module.exports = app;
