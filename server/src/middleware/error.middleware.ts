import { Context } from "hono";
import { BaseError } from "../utils/errors";
import { getIpForLog } from "../utils/ip";

export const errorHandler = async (err: Error, c: Context) => {
	if (err instanceof BaseError) {
		if (err.statusCode >= 500) {
			console.error(
				`Server error - ${err.message} - ${err.stack} - ${c.req.method} - ${c.req.path} - ${getIpForLog(c)}`,
			);
		} else {
			console.log(
				`Client error - ${err.message} - ${c.req.method} - ${c.req.path} - ${getIpForLog(c)}`,
			);
		}
		return c.json(
			{
				message: err.message,
				code: err.statusCode,
			},
			err.statusCode,
		);
	} else {
		console.error(
			`Unexpected error - ${err.message} - ${err.stack} - ${c.req.method} - ${c.req.path} - ${getIpForLog(c)}`,
		);
		return c.json(
			{
				message: "Internal server error.",
				code: 500,
			},
			500,
		);
	}
};
