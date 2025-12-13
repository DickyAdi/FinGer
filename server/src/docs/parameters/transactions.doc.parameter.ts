export const transactionParameters = {
	TransactionId: {
		name: "id",
		in: "path",
		required: true,
		description: "Transaction ID",
		schema: {
			type: "string",
			example: "trx_clxyz123abc",
		},
	},
	PageQuery: {
		name: "page",
		in: "query",
		description: "Page number for pagination",
		required: false,
		schema: {
			type: "integer",
			minimum: 1,
			default: 1,
			example: 1,
		},
	},
	LimitQuery: {
		name: "limit",
		in: "query",
		description: "Number of items per page",
		required: false,
		schema: {
			type: "integer",
			minimum: 1,
			maximum: 100,
			default: 20,
			example: 20,
		},
	},
};
