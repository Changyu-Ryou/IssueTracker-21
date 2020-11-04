import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";

import indexRouter from "./routes/index.js";
import passport from "passport";
import passportConfig from "./config/passport";
require("dotenv").config();

const models = require("./models");

const bodyParser = require("body-parser");

const app = express();

const cors = require("cors");

models.sequelize
  .sync()
  .then(() => {
    console.log(" DB 연결 성공");
  })
  .catch((err) => {
    console.log("연결 실패");
    console.log(err);
  });

//models.sequelize.sync({ force: true }); // 테이블을 모두 재생성. 데이터는 모두 삭제됨
app.use(logger("dev"));
//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
//aplication/json
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(passport.initialize());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
passportConfig();

app.use(express.static(path.join(__dirname, "../dist")));

app.use("/api", indexRouter);
/* support client-side routing */
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./../dist/index.html"));
});

const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`App listening to ${PORT}....`);
  console.log("Press Ctrl+C to quit.");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: "error" });
  models.sequelize.sync();
});

module.exports = app;
