const mongoose = require('mongoose');
const accountConfigs = require('../../config/bills/account');

const schemaDefinition = accountConfigs.reduce((acc, field) => {
	acc[field.name] = { type: mongoose.Schema.Types[field.type], required: field.required || false };
	if (field.default !== undefined) acc[field.name].default = field.default;
	return acc;
}, {});

const billAccountSchema = new mongoose.Schema(schemaDefinition);
const BillAccount = mongoose.model('BillAccount', billAccountSchema);

module.exports = BillAccount;
