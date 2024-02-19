import mongoose from "mongoose";
import Config from "../config/config.js";
import logger from "../utils/logger.js";
import Emitter from "../utils/emitter.js";

class DbManager extends Emitter {
  static instance;
  static mongooseInitialized = false;

  constructor() {
    super();
  }

  static getInstance() {
    if (!DbManager.instance) {
      DbManager.instance = new DbManager();
    }
    return DbManager.instance;
  }

  async init() {
    try {
      await this.initializeMongoose(Config.MONGOOSE.URI);
      this.emit("CONNECTED");
      logger.info("Database connection established!");
    } catch (error) {
      this.emit("CONNECTION_ERROR", error);
      logger.error("Failed to establish database connection:", error.message);
    }
   
  }

  async initializeMongoose(mongooseUri) {
    if (!DbManager.mongooseInitialized) {
      mongoose.connection.on("connected", () => {
        logger.info("[Mongodb] Connected to the database!");
        this.emit("MONGOOSE_CONNECTED");
      });
 
      mongoose.connection.on("error", (error) => {
        logger.error("[Mongodb] Connection error:", error);
        this.emit("MONGOOSE_ERROR", error);
      });

      mongoose.connection.on("disconnected", () => {
        logger.warn("[Mongodb] Connection disconnected!");
        this.emit("MONGOOSE_DISCONNECTED");
      });

      await mongoose.connect(mongooseUri);
      DbManager.mongooseInitialized = true;
      logger.info("[Mongodb] Initialized successfully!");
    }
  }

  async closeConnections() {
    try {
      if (DbManager.mongooseInitialized) {
        await mongoose.disconnect();
        DbManager.mongooseInitialized = false;
        logger.info("[Mongodb] Connection closed!");
      }
    } catch (error) {
      this.emit("CLOSE_CONNECTION_ERROR", error);
      logger.error("Failed to close database connection:", error.message);
    }
  }
}

const DB = DbManager.getInstance();
export default DB;
