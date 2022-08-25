const { verifyJWT } = require("./auth");
const router = require("express").Router();
const Model = require("../models/model");

router.get("/", verifyJWT, async (req, res) => {
  const { id } = req.query;

  const model = await Model.findById(id);

  if (!model) {
    return res.json({ status: "invalid id" });
  }

  return res.json(model);
});

router.get("/all", verifyJWT, async (req, res) => {
  const models = await Model.find({ user: req.user.id }).sort({ updatedAt: -1 });
  return res.json({ models });
});

router.post("/save", verifyJWT, async (req, res) => {
  const { data, id } = req.body;

  const exists = await Model.findById(id);

  if (!exists) {
    const newModel = new Model({
      user: req.user.id,
      data: data,
    });

    newModel.save();
    return res.json({ status: "success" });
  }

  try {
    // TODO: check if this works
    await Model.updateOne({ _id: id }, { data, lastUpdated: Date.now() });
  } catch (err) {
    console.log("error saving model", err);
  }
});

router.get("/delete", verifyJWT, async (req, res) => {
  const { id } = req.query;

  const model = Model.findById(id);

  if (!model) {
    return res.json({ status: "invalid model id" });
  }

  // TODO: check if this works
  await Model.deleteOne({ _id: id });

  return res.json({ status: "success" });
});

module.exports = router;
