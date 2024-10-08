const mongoose = require('mongoose');
const accountConfigs = require('../../config/bills/account');

if (!accountConfigs || !accountConfigs.common || !accountConfigs.types) {
	throw new Error('Account configurations are not properly defined.');
}

const commonFields = accountConfigs.common.reduce((acc, field) => {
	let fieldDefinition = { type: mongoose.Schema.Types[field.type] };
	
	if (field.required) {
		fieldDefinition.required = field.required;
	}
	
	if (field.default !== undefined) {
		fieldDefinition.default = field.default;
	}
	
	acc[field.name] = fieldDefinition;
	return acc;
}, {
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'BillUser',
		required: true
	}
});

// Pre-save hook to ensure correct types for all fields
const ensureFieldTypes = function(next) {
	// Iterate over all fields in the schema
	for (const [key, value] of Object.entries(this.toObject())) {
		// Ensure numbers are correctly parsed
		if (this.schema.paths[key] && this.schema.paths[key].instance === 'Number' && typeof value === 'string') {
			this[key] = parseFloat(value);
		}
		// Ensure dates are correctly parsed
		if (this.schema.paths[key] && this.schema.paths[key].instance === 'Date' && typeof value === 'string') {
			this[key] = new Date(value);
		}
	}
	next();
};

// Create a schema for each account type
const schemaDefinitions = {};
Object.keys(accountConfigs.types).forEach(type => {
	const typeFields = accountConfigs.types[type].reduce((acc, field) => {
		let fieldDefinition = { type: mongoose.Schema.Types[field.type] };
		
		if (field.required) {
			fieldDefinition.required = field.required;
		}
		
		if (field.default !== undefined) {
			fieldDefinition.default = field.default;
		}
		
		acc[field.name] = fieldDefinition;
		return acc;
	}, { ...commonFields });
	
	schemaDefinitions[type] = new mongoose.Schema(typeFields);
	schemaDefinitions[type].pre('save', ensureFieldTypes);  // Apply pre-save hook to ensure field types
});

// Define a default schema that includes common fields
const defaultSchema = new mongoose.Schema(commonFields);
defaultSchema.pre('save', ensureFieldTypes);

schemaDefinitions.default = defaultSchema;

// Function to get the appropriate schema based on typeId
function getSchemaByType(typeId) {
	return schemaDefinitions[typeId] || schemaDefinitions.default;
}

function getModelByType(typeId) {
	const schema = getSchemaByType(typeId);
	return mongoose.models.BillAccount || mongoose.model('BillAccount', schema);
}

module.exports = { getSchemaByType, getModelByType };
