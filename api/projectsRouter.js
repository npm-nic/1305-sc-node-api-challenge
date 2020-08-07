const pModel = require("../data/helpers/projectModel");
const validateId = require("./middleware/validateProjectId");
const validateProject = require("./middleware/validateProjectDetails");

const projectsRouter = require("express").Router();
projectsRouter.use("/:id", validateId);

// // --> GET api/projects <-- // //
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

// // --> GET api/projects/:id <-- // //
projectsRouter.get("/:id", (req, res) => {
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

// // --> GET api/projects/:id/actions <-- // //
projectsRouter.get("/:id/actions", (req, res) => {
  const req_id = req.params.id;
  pModel
    .getProjectActions(req_id)
    .then((data) => res.status(200).json(data))
    .catch((err) =>
      res.status(500).json({
        error: `Error getting project id:${req_id}`,
        message: err.message,
      })
    );
});

// // --> POST api/projects/ <-- // //
projectsRouter.post("/", validateProject, (req, res) => {
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

// // --> PUT api/projects/:id <-- // //
projectsRouter.put("/:id", (req, res) => {
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

// // --> DELETE api/projects/:id <-- // //
projectsRouter.delete("/:id", (req, res) => {
  const req_id = req.params.id;
  pModel
    .remove(req_id)
    .then((data) => res.status(200).json({ deleted: data }))
    .catch((err) =>
      res
        .status(500)
        .json({ error: "Error deleting project", message: err.message })
    );
});

module.exports = projectsRouter;
