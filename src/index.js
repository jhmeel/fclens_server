import express from "express";
import DB from "./providers/dbProvider.js";
import logger from "./utils/logger.js";
import Config from "./config/config.js";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import Emitter from "./utils/emitter.js";
import RoutesProvider from "./providers/routesProvider.js";

class Core extends Emitter {
  constructor() {
    super();
    this.isRunning = false;
    this.app = express();
    this.PORT = Config.PORT;

    this.on("DATABASE_CONNECTED", () => {
      logger.info("Bootstrapping Server....");
      this.app.listen(this.PORT, () => {
        logger.info(`Server Running on port ${this.PORT}....`);
      });
    });
  }

  initMiddlewares() {
    try {
      this.app.use(cors());
      this.app.use(helmet());
      this.app.disable("x-powered-by");
      this.app.use(bodyParser.json()); 
      this.app.use(bodyParser.urlencoded({ extended: true }));
      this.app.use(errorMiddleware);
      logger.info("Middlewares initialized!");
    } catch (err) {
      logger.error("failed to initialize middlewares");
    }
  }

  initRoutes() {
    RoutesProvider.init(this.app);
  }
  
  initDb() {
    DB.init();
    DB.on("CONNECTED", () => {
      this.emit("DATABASE_CONNECTED");
    });
  }

  init() {
    this.initMiddlewares();
    this.initRoutes();
    this.initDb(); 
    return this;
  } 
}

new Core().init();
 