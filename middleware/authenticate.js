import jwt from "jsonwebtoken";

export function authenticate(req, res, next) {
  const authHeader = req.headers?.authorization || req.headers?.Authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "No token provided." });
  }

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : authHeader;

  if (!token) {
    return res.status(401).json({ error: "No token provided." });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "grading-secret-value",
    );
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token." });
  }
}
