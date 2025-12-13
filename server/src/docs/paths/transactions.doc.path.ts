export const transactionPaths = {
	"/transactions": {
		get: {
			summary: "Get all transactions",
			description:
				"Retrieve a paginated list of transactions for the authenticated user, ordered by creation date",
			operationId: "getTransactions",
			tags: ["Transactions"],
			parameters: [
				{
					$ref: "#/components/parameters/PageQuery",
				},
				{
					$ref: "#/components/parameters/LimitQuery",
				},
			],
			responses: {
				"200": {
					description: "Successfully retrieved transactions",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/PaginatedTransactions",
							},
							example: {
								total: 50,
								page: 1,
								limit: 20,
								data: [
									{
										id: "trx_clxyz123abc",
										user_id: "user_clxyz456def",
										type: "income",
										created_at: "2024-01-15T10:30:00.000Z",
										updated_at: "2024-01-15T10:30:00.000Z",
									},
									{
										id: "trx_clxyz789ghi",
										user_id: "user_clxyz456def",
										type: "expense",
										created_at: "2024-01-14T14:20:00.000Z",
										updated_at: "2024-01-14T14:20:00.000Z",
									},
								],
							},
						},
					},
				},
				"401": {
					description: "Not authenticated - missing or invalid session",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/ErrorResponse",
							},
							example: {
								message: "Not authenticated",
								code: 401,
							},
						},
					},
				},
				"404": {
					description: "No transactions found for user",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/ErrorResponse",
							},
							example: {
								message:
									"Cannot find transactions from user with id user_clxyz456def",
								code: 404,
							},
						},
					},
				},
			},
		},
	},
	"/transactions/create/income": {
		post: {
			summary: "Create income transaction",
			description: "Create a new income transaction for the authenticated user",
			operationId: "createIncome",
			tags: ["Transactions"],
			requestBody: {
				required: true,
				content: {
					"application/json": {
						schema: {
							$ref: "#/components/schemas/CreateIncome",
						},
						example: {
							name: "Freelance Project Payment",
							amount: 2500.0,
						},
					},
				},
			},
			responses: {
				"201": {
					description: "Income transaction created successfully",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/IncomeCreatedResponse",
							},
							example: {
								message: "New income transaction created.",
								data: {
									id: "trx_clxyz123abc",
									user_id: "user_clxyz456def",
									type: "income",
									created_at: "2024-01-15T10:30:00.000Z",
									updated_at: "2024-01-15T10:30:00.000Z",
								},
							},
						},
					},
				},
				"400": {
					description: "Invalid request body - validation failed",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/ErrorResponse",
							},
							example: {
								message: "Validation error: amount must be a positive number",
								code: 400,
							},
						},
					},
				},
				"401": {
					description: "Not authenticated - missing or invalid session",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/ErrorResponse",
							},
							example: {
								message: "Not authenticated",
								code: 401,
							},
						},
					},
				},
			},
		},
	},
	"/transactions/create/expense": {
		post: {
			summary: "Create expense transaction",
			description:
				"Create a new expense transaction for the authenticated user",
			operationId: "createExpense",
			tags: ["Transactions"],
			requestBody: {
				required: true,
				content: {
					"application/json": {
						schema: {
							$ref: "#/components/schemas/CreateExpense",
						},
						example: {
							name: "Monthly Rent",
							amount: 1200.0,
						},
					},
				},
			},
			responses: {
				"201": {
					description: "Expense transaction created successfully",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/ExpenseCreatedResponse",
							},
							example: {
								message: "New expense transaction created.",
								data: {
									id: "trx_clxyz789ghi",
									user_id: "user_clxyz456def",
									type: "expense",
									created_at: "2024-01-15T10:30:00.000Z",
									updated_at: "2024-01-15T10:30:00.000Z",
								},
							},
						},
					},
				},
				"400": {
					description: "Invalid request body - validation failed",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/ErrorResponse",
							},
							example: {
								message: "Validation error: amount must be a positive number",
								code: 400,
							},
						},
					},
				},
				"401": {
					description: "Not authenticated - missing or invalid session",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/ErrorResponse",
							},
							example: {
								message: "Not authenticated",
								code: 401,
							},
						},
					},
				},
			},
		},
	},
	"/transactions/{id}": {
		get: {
			summary: "Get transaction by ID",
			description: "Retrieve a specific transaction by its ID",
			operationId: "getTransactionById",
			tags: ["Transactions"],
			parameters: [
				{
					$ref: "#/components/parameters/TransactionId",
				},
			],
			responses: {
				"200": {
					description: "Successfully retrieved transaction",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/Transaction",
							},
							example: {
								id: "trx_clxyz123abc",
								user_id: "user_clxyz456def",
								type: "income",
								created_at: "2024-01-15T10:30:00.000Z",
								updated_at: "2024-01-15T10:30:00.000Z",
							},
						},
					},
				},
				"401": {
					description: "Not authenticated - missing or invalid session",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/ErrorResponse",
							},
							example: {
								message: "Not authenticated",
								code: 401,
							},
						},
					},
				},
				"404": {
					description: "Transaction not found",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/ErrorResponse",
							},
							example: {
								message: "Transaction not found",
								code: 404,
							},
						},
					},
				},
			},
		},
		delete: {
			summary: "Delete transaction",
			description: "Delete a specific transaction by its ID",
			operationId: "deleteTransaction",
			tags: ["Transactions"],
			parameters: [
				{
					$ref: "#/components/parameters/TransactionId",
				},
			],
			responses: {
				"200": {
					description: "Transaction deleted successfully",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/DeletedResponse",
							},
							example: {
								message: "Transaction deleted.",
							},
						},
					},
				},
				"401": {
					description: "Not authenticated - missing or invalid session",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/ErrorResponse",
							},
							example: {
								message: "Not authenticated",
								code: 401,
							},
						},
					},
				},
				"404": {
					description: "Transaction not found",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/ErrorResponse",
							},
							example: {
								message: "Cannot find transaction with id trx_clxyz123abc",
								code: 404,
							},
						},
					},
				},
			},
		},
	},
};
