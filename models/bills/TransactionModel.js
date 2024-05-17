const mongoose = require('mongoose');
const transactionConfig = require('../../config/bills/transaction');

const flattenConfig = (config) => {
	let flattened = [];
	flattened = flattened.concat(config.common);
	Object.values(config.types).forEach(typeFields => {
		flattened = flattened.concat(typeFields);
	});
	return flattened;
};

const flattenedConfig = flattenConfig(transactionConfig);

const typeMapping = {
	String: String,
	Number: Number,
	Date: Date,
	Boolean: Boolean
};

const schemaDefinition = flattenedConfig.reduce((acc, field) => {
	const fieldType = typeMapping[field.type];
	if (fieldType) {
		acc[field.name] = {
			type: fieldType,
			required: function() {
				if (transactionConfig.common.some(f => f.name === field.name)) {
					return field.required || false;
				}
				if (this.transactionTypeId && transactionConfig.types[this.transactionTypeId]) {
					return transactionConfig.types[this.transactionTypeId].some(f => f.name === field.name) ? field.required || false : false;
				}
				return false;
			},
			default: field.initialState !== undefined ? field.initialState : undefined
		};
	}
	return acc;
}, {
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'BillUser',
		required: true
	}
});

const transactionSchema = new mongoose.Schema(schemaDefinition);
const BillTransaction = mongoose.model('BillTransaction', transactionSchema);

module.exports = BillTransaction;
