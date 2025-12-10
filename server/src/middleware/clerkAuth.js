const { ClerkExpressWithAuth } = require("@clerk/clerk-sdk-node");

const clerkAuth = ClerkExpressWithAuth();

module.exports = (req, res, next) =>
  clerkAuth(req, res, (err) => {
    if (err || !req.auth?.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = { id: req.auth.userId, claims: req.auth?.claims };
    next();
  });

