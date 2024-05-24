import mongoose from 'mongoose';

const UseDividers = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			trim: true,
		},
		dividername: {
			type: String,
			required: true,
			trim: true,
		},
	},
	{ collection: 'dividers' },
);

const Divider = mongoose.model('Divider', UseDividers);

export default Divider;
