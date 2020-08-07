function validateActionDetails(req, res, next) {
  const { project_id, description, notes } = req.body;
  !project_id || !description || !notes
    ? res.status(400).json({
        message:
          "please check that project_id, description & notes are on req.body when adding an action",
      })
    : next();
}

module.exports = validateActionDetails;
