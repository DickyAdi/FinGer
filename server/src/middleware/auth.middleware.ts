import { Context, Next } from "hono";
import { auth } from "../lib/auth";
import { NotAuthenticatedError } from "../utils/errors";

export const requireAuth = async (c: Context, next: Next) => {
	const session = await auth.api.getSession({
		headers: c.req.raw.headers,
	});

	if (!session) {
		// c.set("user", null);
		// c.set("session", null);
		// await next();
		// return c.json({ message: "Unauthorized." }, 401);
		throw new NotAuthenticatedError();
	}
	c.set("user", session.user);
	c.set("session", session.session);
	await next();
};

export const optionalAuth = async (c: Context, next: Next) => {
	const session = await auth.api.getSession({
		headers: c.req.raw.headers,
	});

	if (session) {
		c.set("user", session.user);
		c.set("session", session.session);
	}
	await next();
};
