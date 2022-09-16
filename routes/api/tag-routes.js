const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const allTags = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(allTags);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const singleTag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    res.json(singleTag);
  } catch (err) {
    res.status(500).json(err.message);
  }
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post("/", async (req, res) => {
  try {
    const createTag = await Tag.create(req.body);
    res.json(createTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updateTag = await Tag.update(req.body,
      { where: { id: req.params.id } },
      req.body
    );
    res.json(updateTag);
  } catch (err) {
    res.status(500).json(err.message);
  }
  // update a tag's name by its `id` value
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  try {
    const removeTag = await Tag.destroy({ where: { id: req.params.id } });
    res.json(removeTag);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
