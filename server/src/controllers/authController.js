exports.me = async (req, res) => {
  // req.user is populated by Clerk middleware
  res.json({
    user: {
      id: req.user?.id,
      email: req.user?.claims?.email,
      name: req.user?.claims?.name || req.user?.claims?.full_name,
    },
  });
};

