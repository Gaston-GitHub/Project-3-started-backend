const express = require('express');
const { checkIfLoggedIn } = require('../middlewares');

const router = express.Router();
const Wine = require('../models/Wine');

router.use(checkIfLoggedIn);
//  create and save a new wine
router.post('/', checkIfLoggedIn, async (req, res, next) => {
	if (!req.body.name) {
		res.status(400).send({ message: 'Content can not be empty' });
	}
	const { name, type, grape, year, country, price, reviews, images } = req.body;
	try {
		const wine = await Wine.create({
			name,
			type,
			grape,
			year,
			country,
			price,
			reviews,
			images,
		});
		res.json({ create: wine });
	} catch (error) {
		next(error);
	}
});
// retrieve all wines
router.get('/', checkIfLoggedIn, async (req, res) => {
	const wine = await Wine.find();
	res.json({ found: wine });
});
// retireve wine finding by id
router.get('/:id', checkIfLoggedIn, async (req, res, next) => {
	const { id } = req.params;
	try {
		const wine = await Wine.findById(id);
		if (wine === null) {
			const notFound = new Error('not found');
			notFound.status = 404;
			throw notFound;
		}
		res.json({ found: wine });
	} catch (error) {
		next(error);
	}
});
// retireve wine finding by id and update
router.put('/:id', checkIfLoggedIn, async (req, res) => {
	const { name, type, grape, country, price, reviews, images } = req.body;
	const { id } = req.params;

	const updatedWine = await Wine.findByIdAndUpdate(
		id,
		{ name, type, grape, country, price, reviews, images },
		{ new: true }
	);
	res.json({ updated: updatedWine });
});
// delete wine
router.delete('/:id', checkIfLoggedIn, async (req, res, next) => {
	const { id } = req.params;
	try {
		const deletedWine = await Wine.findByIdAndDelete(id);
		res.json({ deleted: deletedWine });
	} catch (error) {
		next(error);
	}
});
module.exports = router;
