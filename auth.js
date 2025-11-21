import { verifyToken } from "../helper/jwt.js";

export const authmiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization; // ✅ fixed: was req.headers('authorization')
    if (!authHeader) return res.json("Unauthorized");

    const token = authHeader.split(" ")[1]; // Bearer token
    const verify_Token = await verifyToken(token);
    if (!verify_Token) return res.json("Unauthorized");

    req.user = verify_Token; // attach user to req
    next(); // Continue to route
  } catch (error) {
    res.json("Unauthorized");
  }
};
