import express from "express";
import DB from "./providers/dbProvider.js";
import logger from "./utils/logger.js";
import Config from "./config/config.js";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import RoutesProvider from "./providers/routesProvider.js";
import dotenv from'dotenv'

dotenv.config()
class Core {
  constructor() {
    this.isRunning = false;
    this.app = express();
    this.PORT = Config.PORT;
  }

  initMiddlewares() {
    try {
      this.app.use(cors({
        origin: 'https://fclens.onrender.com',
      }))
      this.app.use(helmet());
      this.app.disable("x-powered-by");
      this.app.use(bodyParser.json());
      this.app.use(bodyParser.urlencoded({ extended: true }));
      this.app.use((req, res, next) => {
        logger.info(req.headers);
        next();
      });
      this.app.use(errorMiddleware);
      logger.info("Middlewares initialized!");
    } catch (err) {
      logger.error("failed to initialize middlewares");
    }
  }

  initRoutes() {
    RoutesProvider.init(this.app);
  }

  bootstrap() {
    this.initMiddlewares();
    this.initRoutes();
    DB.init().then(() => {
      this.app.listen(this.PORT, () => {
        logger.info(`server running on port ${this.PORT}`);
      });
    });
  }
}

new Core().bootstrap();
