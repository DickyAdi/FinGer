export const expenseSchemas = {
	Expense: {
		type: "object",
		properties: {
			id: {
				type: "string",
				description: "Unique expense identifier",
				example: "exp_clxyz123abc",
			},
			name: {
				type: "string",
				description: "Name of the expense",
				example: "Grocery Shopping",
			},
			amount: {
				type: "string",
				description: "Expense amount (numeric string with 2 decimal places)",
				example: "150.50",
				pattern: "^\\d+\\.\\d{2}$",
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
			transaction_id: {
				type: "string",
				description: "Associated transaction ID",
				example: "trx_clxyz456def",
			},
		},
	},
	PaginatedExpenses: {
		type: "object",
		required: ["total", "page", "limit", "data"],
		properties: {
			total: {
				type: "integer",
				description: "Total number of expenses for the user",
				example: 30,
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
				description: "Array of expense objects",
				items: {
					$ref: "#/components/schemas/Expense",
				},
			},
		},
	},
};
