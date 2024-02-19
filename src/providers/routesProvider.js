import logger from "../utils/logger.js";
import UserRouter from "../routes/user.js";
import { errorMiddleware } from "../middlewares/error.js";

class RoutesProvider {
  static init(app) {
    logger.info("initializing routes...");
    app.use(UserRouter);
    app.use(errorMiddleware)
    logger.info("Routes initialized!");
  }
}
 
export default RoutesProvider;

