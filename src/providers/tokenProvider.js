import jwt from "jsonwebtoken";
import { Config } from "../config";
import User from "../models/user";

class JWT {
  static createToken(id, role) {
    if (!id || !role) {
      throw new Error('Missing "Id" and "role" to create access-token!');
    }

    try {
      // Create a new access token
      const secretKey = Config.JWT.SECRET_KEY;
      const expiresIn = Config.JWT.EXPIRES_IN;
      const accessToken = jwt.sign({ id, role }, secretKey, {
        expiresIn: "30m",
      });

      return accessToken;
    } catch (err) {
      throw err;
    }
  }

  static async verifyToken(token) {
    try {
      const secretKey = Config.JWT.SECRET_KEY;
      const verified = await jwt.verify(token, secretKey);
      const user = await User.findById(verified.id);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (err) {
      throw err;
    }
  }

  static createJwtToken(user) {
    return this.createToken({ id: user._id, role: user.role });
  }

  static verifyJwtToken(token) {
    return this.verifyToken(token);
  }
}

export { JWT };
