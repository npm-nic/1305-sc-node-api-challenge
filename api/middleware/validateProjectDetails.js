function validateProjectDetails(req, res, next) {
  const { name, description } = req.body;
  !name || !description
    ? res.status(400).json({
        message:
          "please include both name & description on body when making a post",
      })
    : next();
}

module.exports = validateProjectDetails;
