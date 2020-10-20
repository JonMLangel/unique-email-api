'use strict';

const express = require("express");
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const emailRouter = require("./routes/email");

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', [emailRouter]);

app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV === "development" ? err : {};

  let errorResponse = {
    err: err.message,
    status: err.status || 500,
    endpoint: req.url,
    ip: req.ip,
    method: req.method,
  };
  if (req.body) errorResponse.body = req.body;
  if (req.params) errorResponse.params = req.params;

  res.status(errorResponse.status);
  res.send(errorResponse);
});

//setup express configuration
app.set("trust.proxy", true);
//setup serving the site root
const host = process.env.HOST || "127.0.0.1";
const port = process.env.PORT || 4000;
// have the app listen for requests
app.listen(port, host);
console.log("app listening on " + host + ":" + port);
