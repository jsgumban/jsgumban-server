const mongoose = require('mongoose');
const transactionConfig = require('../../config/bills/transaction');

// Function to flatten the configuration
const flattenConfig = (config) => {
	let flattened = [];
	
	// Add common fields
	flattened = flattened.concat(config.common);
	
	// Add type-specific fields
	Object.values(config.types).forEach(typeFields => {
		flattened = flattened.concat(typeFields);
	});
	
	return flattened;
};

// Flatten the transactionsConfig
const flattenedConfig = flattenConfig(transactionConfig);

// Map configuration types to Mongoose schema types
const typeMapping = {
	String: String,
	Number: Number,
	Date: Date,
	Boolean: Boolean // Add other type mappings if needed
};

// Create schema definition with conditional required fields
const schemaDefinition = flattenedConfig.reduce((acc, field) => {
	const fieldType = typeMapping[field.type];
	if (fieldType) {
		acc[field.name] = {
			type: fieldType,
			required: function() {
				// Check if the field is in the common fields or required for the specific transaction type
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
}, {});

// Define the schema
const transactionSchema = new mongoose.Schema(schemaDefinition);
const BillTransaction = mongoose.model('BillTransaction', transactionSchema);

module.exports = BillTransaction;
