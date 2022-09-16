const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const allCat = await Category.findAll({
      include: [{ model: Product }],
    });
    res.json(allCat)
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const singleCat = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    res.json(singleCat)
  } catch (err) {

  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const createCat = await Category.create(req.body);
    res.json(createCat);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body,
    {
      where: {
        id: req.params.id,
      },
    })
    .then((category) => res.status(200).json(category))
    .catch((err) => res.status(404).json(err))
  // update a tag's name by its `id` value
});

router.delete("/:id", async (req, res) => {
  try {
    const removeCat = await Category.destroy({ where: { id: req.params.id } });
    res.json(removeCat);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
