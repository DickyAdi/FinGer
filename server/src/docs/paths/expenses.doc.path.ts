export const expensePaths = {
	"/expenses": {
		get: {
			summary: "Get all expenses",
			description:
				"Retrieve a paginated list of expenses for the authenticated user, ordered by creation date (newest first)",
			operationId: "getExpenses",
			tags: ["Expenses"],
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
					description: "Successfully retrieved expenses",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/PaginatedExpenses",
							},
							example: {
								total: 30,
								page: 1,
								limit: 20,
								data: [
									{
										id: "exp_clxyz123abc",
										name: "Grocery Shopping",
										amount: "150.50",
										created_at: "2024-01-15T10:30:00.000Z",
										updated_at: "2024-01-15T10:30:00.000Z",
										transaction_id: "trx_clxyz456def",
									},
									{
										id: "exp_clxyz789ghi",
										name: "Monthly Rent",
										amount: "1200.00",
										created_at: "2024-01-14T14:20:00.000Z",
										updated_at: "2024-01-14T14:20:00.000Z",
										transaction_id: "trx_clxyz012jkl",
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
			},
		},
	},
};
