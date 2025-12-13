export const healthPaths = {
	"/health": {
		get: {
			summary: "Health check",
			description: "Check if the API is running",
			operationId: "healthCheck",
			tags: ["Health"],
			responses: {
				"200": {
					description: "API is healthy",
					content: {
						"application/json": {
							example: {
								status: "OK",
							},
						},
					},
				},
			},
		},
	},
};
