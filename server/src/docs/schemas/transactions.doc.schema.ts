export const transactionSchemas = {
	CreateIncome: {
		type: "object",
		required: ["name", "amount"],
		properties: {
			name: {
				type: "string",
				description: "Name of the income transaction",
				example: "Salary Payment",
				minLength: 1,
			},
			amount: {
				type: "number",
				description:
					"Amount of income (positive number with max 2 decimal places)",
				example: 5000.0,
				minimum: 0.01,
				multipleOf: 0.01,
			},
		},
	},
	CreateExpense: {
		type: "object",
		required: ["name", "amount"],
		properties: {
			name: {
				type: "string",
				description: "Name of the expense transaction",
				example: "Grocery Shopping",
				minLength: 1,
			},
			amount: {
				type: "number",
				description:
					"Amount of expense (positive number with max 2 decimal places)",
				example: 150.5,
				minimum: 0.01,
				multipleOf: 0.01,
			},
		},
	},
	Transaction: {
		type: "object",
		properties: {
			id: {
				type: "string",
				description: "Unique transaction identifier",
				example: "trx_clxyz123abc",
			},
			user_id: {
				type: "string",
				description: "User ID who owns the transaction",
				example: "user_clxyz456def",
			},
			type: {
				type: "string",
				enum: ["income", "expense"],
				description: "Type of transaction",
				example: "income",
			},
			created_at: {
				type: "string",
				format: "date-time",
				description: "Creation timestamp",
				example: "2024-01-15T10:30:00.000Z",
			},
			updated_at: {
				type: "string",
				format: "date-time",
				description: "Last update timestamp",
				example: "2024-01-15T10:30:00.000Z",
			},
		},
	},
	PaginatedTransactions: {
		type: "object",
		required: ["total", "page", "limit", "data"],
		properties: {
			total: {
				type: "integer",
				description: "Total number of transactions for the user",
				example: 50,
			},
			page: {
				type: "integer",
				description: "Current page number",
				example: 1,
			},
			limit: {
				type: "integer",
				description: "Number of items per page",
				example: 20,
			},
			data: {
				type: "array",
				description: "Array of transaction objects",
				items: {
					$ref: "#/components/schemas/Transaction",
				},
			},
		},
	},
	IncomeCreatedResponse: {
		type: "object",
		required: ["message", "data"],
		properties: {
			message: {
				type: "string",
				example: "New income transaction created.",
			},
			data: {
				$ref: "#/components/schemas/Transaction",
			},
		},
	},
	ExpenseCreatedResponse: {
		type: "object",
		required: ["message", "data"],
		properties: {
			message: {
				type: "string",
				example: "New expense transaction created.",
			},
			data: {
				$ref: "#/components/schemas/Transaction",
			},
		},
	},
	DeletedResponse: {
		type: "object",
		required: ["message"],
		properties: {
			message: {
				type: "string",
				example: "Transaction deleted.",
			},
		},
	},
	ErrorResponse: {
		type: "object",
		required: ["message", "code"],
		properties: {
			message: {
				type: "string",
				description: "Error message describing what went wrong",
				example: "Cannot find transaction with id trx_123abc",
			},
			code: {
				type: "integer",
				description: "HTTP status code",
				example: 404,
			},
		},
	},
};
