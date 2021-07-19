const express = require('express');
const { checkIfLoggedIn } = require('../middlewares');

const router = express.Router();
const Winery = require('../models/Winery');

router.use(checkIfLoggedIn);
// create and save a new winery
router.post('/', checkIfLoggedIn, async (req, res, next) => {
	if (!req.body.name) {
		res.status(400).send({ message: 'Content can not be empty' });
	}
	const { name, address, country, wine } = req.body;
	try {
		const winery = await Winery.create({
			name,
			address,
			country,
			wine,
		});
		res.json({ create: winery });
	} catch (error) {
		next(error);
	}
});
// retrieve all winery
router.get('/', checkIfLoggedIn, async (req, res) => {
	const winery = await Winery.find();
	res.json({ found: winery });
});
// retrieve winery finding by id
router.get('/:ïd', async (req, res, next) => {
	const { id } = req.params;
	try {
		const winery = await Winery.findById(id);
		if (winery === null) {
			const notFound = new Error('not found');
			notFound.status = 404;
			throw notFound;
		}
		res.json({ found: winery });
	} catch (error) {
		next(error);
	}
});
// retrieve winery findung by id and update
router.put('/:id', checkIfLoggedIn, async (req, res) => {
	const { name, address, country, wine } = req.body;
	const { id } = req.params;

	const updatedWinery = await Winery.findByIdAndUpdate(id, { name, address, country, wine }, { new: true });
	res.json({ updated: updatedWinery });
});
// deleted winery
router.delete('/:id', checkIfLoggedIn, async (req, res, next) => {
	const { id } = req.params;
	try {
		const deleteWinery = await Winery.findByIdAndDelete(id);
		res.json({ deleted: deleteWinery });
	} catch (error) {
		next(error);
	}
});

module.exports = router;
