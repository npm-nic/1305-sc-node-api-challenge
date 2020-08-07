const pModel = require("../data/helpers/projectModel");
const projectsRouter = require("express").Router();

projectsRouter.get("/", async (req, res) => {
  pModel
    .get()
    .then((data) => res.status(200).json(data))
    .catch((err) =>
      res
        .status(500)
        .json({ error: "Error getting projects", message: err.message })
    );
});

projectsRouter.get("/:id", validateProjectId, (req, res) => {
  const req_id = req.params.id;
  pModel
    .get(req_id)
    .then((data) => res.status(200).json(data))
    .catch((err) =>
      res.status(500).json({
        error: `Error getting project id:${req_id}`,
        message: err.message,
      })
    );
});

projectsRouter.post("/", validateProjectDetails, (req, res) => {
  const newProjectDetails = req.body;
  pModel
    .insert(newProjectDetails)
    .then((data) => res.status(201).json({ created: data }))
    .catch((err) =>
      res
        .status(500)
        .json({ error: "Error saving project", message: err.message })
    );
});
projectsRouter.put("/:id", validateProjectId, (req, res) => {
  const req_id = req.params.id;
  const updatedProjectDetails = req.body;
  pModel
    .update(req_id, updatedProjectDetails)
    .then((data) => res.status(200).json({ updated: data }))
    .catch((err) =>
      res
        .status(500)
        .json({ error: "Error updating project", message: err.message })
    );
});

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
function validateProjectDetails(req, res, next) {
  const { name, description } = req.body;
  !name || !description
    ? res.status(400).json({
        message:
          "please include both name & description on body when making a post",
      })
    : next();
}

module.exports = projectsRouter;
