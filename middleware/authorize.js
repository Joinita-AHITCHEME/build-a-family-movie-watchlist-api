export function authorizeModification(req, res, next) {
  const role = req.user?.role;
  const userId = req.params?.userId;
  const userObjId = req.user?.id;

  if (role === "parent") {
    return next();
  }

  if (role === "child" && String(userId) === String(userObjId)) {
    return next();
  }

  return res.status(403).json({ error: "Access denied" });
}
