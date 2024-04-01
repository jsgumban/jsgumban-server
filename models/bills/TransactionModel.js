const mongoose = require('mongoose');
const transactionConfig = require('../../config/bills/transaction');

const schemaDefinition = transactionConfig.reduce((acc, field) => {
	acc[field.name] = { type: mongoose.Schema.Types[field.type], required: field.required || false };
	if (field.default !== undefined) acc[field.name].default = field.default;
	return acc;
}, {});

const billTransactionSchema = new mongoose.Schema(schemaDefinition);
const BillTransaction = mongoose.model('BillTransaction', billTransactionSchema);

module.exports = BillTransaction;
