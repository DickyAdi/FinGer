import { ContentfulStatusCode } from "hono/utils/http-status";

export class BaseError extends Error {
	constructor(
		public statusCode: ContentfulStatusCode,
		message: string,
	) {
		super(message);
		Object.setPrototypeOf(this, BaseError.prototype);
	}
}

export class NotFoundError extends BaseError {
	constructor(message: string = "Resource not found.") {
		super(404, message);
	}
}

export class NotAuthenticatedError extends BaseError {
	constructor(message: string = "Not authenticated.") {
		super(401, message);
	}
}

export class ForbiddenError extends BaseError {
	constructor(message: string = "Forbidden.") {
		super(403, message);
	}
}

export class UnsufficientBalanceError extends BaseError {
	constructor(message: string = "Unsufficient balance to process") {
		super(409, message);
	}
}
