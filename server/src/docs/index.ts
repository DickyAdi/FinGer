import { transactionSchemas } from "./schemas/transactions.doc.schema";
import { transactionParameters } from "./parameters/transactions.doc.parameter";
import { healthPaths } from "./paths/health.doc.path";
import { transactionPaths } from "./paths/transactions.doc.path";

const openApiDoc = {
	openapi: "3.0.0",
	info: {
		title: "Transaction API",
		version: "1.0.0",
		description: "API for managing income and expense transactions",
	},
	servers: [
		{
			url: "/api",
			description: "API base path",
		},
	],
	components: {
		securitySchemes: {
			cookieAuth: {
				type: "apiKey",
				in: "cookie",
				name: "better-auth.session_token",
				description: "Better-auth session cookie",
			},
		},
		schemas: {
			...transactionSchemas,
		},
		parameters: {
			...transactionParameters,
		},
	},
	security: [
		{
			cookieAuth: [],
		},
	],
	paths: {
		...healthPaths,
		...transactionPaths,
	},
};

export default openApiDoc;
