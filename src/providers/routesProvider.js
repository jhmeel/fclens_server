import logger from "../utils/logger.js";
import UserRouter from "../routes/user.js";

class RoutesProvider {
  static init(app) {
    logger.info("initializing routes...");
    app.use(UserRouter);
    logger.info("Routes initialized!");
  }
}
 
export default RoutesProvider;
