const pModel = require("../data/helpers/projectModel");
const projectsRouter = require("express").Router();

projectsRouter.get("/", (req, res) => {
  pModel
    .get()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: "Error gathering resources", message: err.message });
    });
});

projectsRouter.get("/:id", validateProjectId, (req, res) => {
  const req_id = req.params.id;
  pModel
    .get(req_id)
    .then((data) => res.json(data))
    .catch((err) => {
      res
        .status(500)
        .json({ error: "Error gathering resources", message: err.message });
    });
});

async function validateProjectId(req, res, next) {
  const req_id = req.params.id;
  try {
    const projectFound = await pModel.get(req_id);
    projectFound
      ? next()
      : res.status(200).json({ message: `no project with the id: ${req_id}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = projectsRouter;
