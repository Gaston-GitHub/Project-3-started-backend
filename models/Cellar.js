const mongoose = require('mongoose');

const { Schema } = mongoose;

const cellarSchema = new Schema(
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

const Cellar = mongoose.model('Cellar', cellarSchema);

module.export = Cellar;
