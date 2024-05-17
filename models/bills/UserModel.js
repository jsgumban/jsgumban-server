const mongoose = require('mongoose');
const userConfig = require('../../config/bills/user');

const typeMapping = {
	String: String,
	Number: Number,
	Date: Date,
	Boolean: Boolean,
};

const schemaDefinition = userConfig.common.reduce((acc, field) => {
	const fieldType = typeMapping[field.type];
	if (fieldType) {
		acc[field.name] = {
			type: fieldType,
			required: field.required,
			default: field.initialState,
		};
	}
	return acc;
}, {});

const userSchema = new mongoose.Schema(schemaDefinition);

const BillUser = mongoose.model('BillUser', userSchema);

module.exports = BillUser;
