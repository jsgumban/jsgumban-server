const mongoose = require('mongoose');
const accountConfigs = require('../../config/bills/account');

const schemaDefinition = accountConfigs.common.reduce((acc, field) => {
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

Object.keys(accountConfigs.types).forEach(type => {
	accountConfigs.types[type].forEach(field => {
		let fieldDefinition = { type: mongoose.Schema.Types[field.type] };
		
		if (field.required) {
			fieldDefinition.required = field.required;
		}
		
		if (field.default !== undefined) {
			fieldDefinition.default = field.default;
		}
		
		schemaDefinition[field.name] = fieldDefinition;
	});
});

const billAccountSchema = new mongoose.Schema(schemaDefinition);
const BillAccount = mongoose.model('BillAccount', billAccountSchema);

module.exports = BillAccount;
