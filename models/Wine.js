const mongoose = require('mongoose');

const { Schema } = mongoose;

const wineSchema = new Schema(
	{
		name: String,
		type: String,
		grape: String,
		country: String,
		price: String,
		reviews: String,
		images: String,
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	}
);

const Wine = mongoose.model('Wine', wineSchema);
module.exports = Wine;
