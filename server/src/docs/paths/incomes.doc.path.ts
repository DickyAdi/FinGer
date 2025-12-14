export const incomePaths = {
	"/incomes": {
		get: {
			summary: "Get all incomes",
			description:
				"Retrieve a paginated list of incomes for the authenticated user, ordered by creation date (newest first)",
			operationId: "getIncomes",
			tags: ["Incomes"],
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
					description: "Successfully retrieved incomes",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/PaginatedIncomes",
							},
							example: {
								total: 25,
								page: 1,
								limit: 20,
								data: [
									{
										id: "inc_clxyz123abc",
										name: "Salary Payment",
										amount: "5000.00",
										created_at: "2024-01-15T10:30:00.000Z",
										updated_at: "2024-01-15T10:30:00.000Z",
										transaction_id: "trx_clxyz456def",
									},
									{
										id: "inc_clxyz789ghi",
										name: "Freelance Project",
										amount: "2500.00",
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
