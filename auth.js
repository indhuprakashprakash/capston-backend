import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const secretKey = process.env.JWT_SECRET_KEY;

export async function authenticate(request, response, next) {
  try {
    const token = request.headers.authorization;

    if (!token) {
      return response.status(401).json({ error: "Authorization failed" });
    }

    const decodedToken = jwt.verify(token, secretKey);

    const userId = decodedToken.userId;

    request.user = { id: userId };

    next();
  } catch (err) {
    response.status(401).json({ error: "Authorization failed" });
  }
}
