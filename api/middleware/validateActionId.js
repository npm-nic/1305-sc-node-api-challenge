const aModel = require("../../data/helpers/actionModel");

async function validateActionId(req, res, next) {
  const req_id = req.params.id;
  try {
    const projectFound = await aModel.get(req_id);
    projectFound
      ? next()
      : res.status(200).json({ message: `no action with the id: ${req_id}` });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error validating action id", err: error.message });
  }
}

module.exports = validateActionId;
