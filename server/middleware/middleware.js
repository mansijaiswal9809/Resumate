import jwt from "jsonwebtoken";
import User from "../models/auth.js";

const JWT_SECRET = process.env.JWT_SECRET || "SECRET";

 const protect = async (req, res, next) => {
   try {
     const token = req.cookies?.token;
    //  console.log(token)

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token provided" });
    }

    // Verify JWT
    const decoded = jwt.verify(token, JWT_SECRET);

    // Find user by ID, exclude password
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
export default protect