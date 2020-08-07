const aModel = require("../data/helpers/actionModel");
const validateActionId = require("./middleware/validateActionId");
const validateActionDetails = require("./middleware/validateActionDetails");

const actionsRouter = require("express").Router();
actionsRouter.use("/:id", validateActionId);

// // --> GET api/actions <-- // //
actionsRouter.get("/", async (req, res) => {
  aModel
    .get()
    .then((data) => res.status(200).json(data))
    .catch((err) =>
      res
        .status(500)
        .json({ error: "Error getting actions", message: err.message })
    );
});

// // --> GET api/actions/:id <-- // //
actionsRouter.get("/:id", (req, res) => {
  const req_id = req.params.id;
  aModel
    .get(req_id)
    .then((data) => res.status(200).json(data))
    .catch((err) =>
      res.status(500).json({
        error: `Error getting action id:${req_id}`,
        message: err.message,
      })
    );
});

// // --> POST api/actions/ <-- // //
actionsRouter.post("/", validateActionDetails, async (req, res) => {
  const newActionDetails = req.body;
  aModel
    .insert(newActionDetails)
    .then((data) => res.status(201).json({ created: data }))
    .catch((err) =>
      res.status(500).json({
        error: "Error saving action -- make sure project_id is one that exists",
        message: err.message,
      })
    );
});

// // --> PUT api/actions/:id <-- // //
actionsRouter.put("/:id", (req, res) => {
  const req_id = req.params.id;
  const updatedActionDetails = req.body;
  aModel
    .update(req_id, updatedActionDetails)
    .then((data) => res.status(200).json({ updated: data }))
    .catch((err) =>
      res
        .status(500)
        .json({ error: "Error updating action", message: err.message })
    );
});

// // --> DELETE api/actions/:id <-- // //
actionsRouter.delete("/:id", (req, res) => {
  const req_id = req.params.id;
  aModel
    .remove(req_id)
    .then((data) => res.status(200).json({ deleted: data }))
    .catch((err) =>
      res
        .status(500)
        .json({ error: "Error deleting action", message: err.message })
    );
});

module.exports = actionsRouter;
