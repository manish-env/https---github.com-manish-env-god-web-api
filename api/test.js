module.exports = (req, res) => {
  res.json({
    message: 'API is working',
    query: req.query,
    method: req.method,
    path: req.path
  });
};
