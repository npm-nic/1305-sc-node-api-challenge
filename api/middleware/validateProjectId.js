const pModel = require("../../data/helpers/projectModel");

async function validateProjectId(req, res, next) {
  const req_id = req.params.id;
  try {
    const projectFound = await pModel.get(req_id);
    projectFound
      ? next()
      : res.status(200).json({ message: `no project with the id: ${req_id}` });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error validating project id", err: error.message });
  }
}

module.exports = validateProjectId;
