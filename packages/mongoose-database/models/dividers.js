import mongoose from 'mongoose';

const UseDividers = new mongoose.Schema(
	{
		dividerName: {
			type: String,
			required: true,
			trim: true,
		},
		folders: {
			type: Array,
			required: true,
			trim: true,
		},
	},
	{ collection: 'dividers' },
);

const Divider = mongoose.model('Divider', UseDividers);

export default Divider;
