const mongoose = require('mongoose');

const { Schema } = mongoose;

const winerySchema = new Schema(
	{
		name: String,
		address: String,
		country: String,
		wine: [{ type: Schema.Types.ObjectId, ref: 'Wine' }],
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	}
);

const Winery = mongoose.model('Winery', winerySchema);
module.exports = Winery;
