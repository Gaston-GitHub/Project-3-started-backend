const mongoose = require('mongoose');

const { Schema } = mongoose;

const wineSchema = new Schema(
	{
		name: String,
		type: String,
		grape: String,
		year: String,
		country: String,
		price: String,
		review: String,
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
