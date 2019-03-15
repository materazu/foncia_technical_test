const get = (req, res) => {
  res.send(req.user)
}

module.exports = { get };