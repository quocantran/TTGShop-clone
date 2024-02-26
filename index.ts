import express, { Express, Request } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import * as database from "./config/database";
import routes from "./routes/client/index.route";
import flash from "express-flash";
import cookieParser from "cookie-parser";
import session from "express-session";

const app: Express = express();

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");
app.use(express.static(`${__dirname}/public`));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

dotenv.config();

//flash
app.use(cookieParser(process.env.SECRET_FLASH_KEY));
app.use(
  session({
    secret: process.env.SECRET_FLASH_KEY,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());
//end flash
database.connect();
routes(app);

//setup quantity cart
app.locals.quantityCart = 0;
//end quantity cart

//setup alert cart data
app.locals.cartData = {};
//end setup alert cart data

const PORT: string = process.env.PORT;

app.listen(PORT, (): void => {
  console.log("server running");
});
