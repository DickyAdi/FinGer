export const incomeSchemas = {
	Income: {
		type: "object",
		properties: {
			id: {
				type: "string",
				description: "Unique income identifier",
				example: "inc_clxyz123abc",
			},
			name: {
				type: "string",
				description: "Name of the income",
				example: "Salary Payment",
			},
			amount: {
				type: "string",
				description: "Income amount (numeric string with 2 decimal places)",
				example: "5000.00",
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
	PaginatedIncomes: {
		type: "object",
		required: ["total", "page", "limit", "data"],
		properties: {
			total: {
				type: "integer",
				description: "Total number of incomes for the user",
				example: 25,
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
				description: "Array of income objects",
				items: {
					$ref: "#/components/schemas/Income",
				},
			},
		},
	},
};
