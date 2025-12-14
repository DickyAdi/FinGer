import { Context } from "hono";
import { getConnInfo } from "hono/bun";

export const getIpForLog = (c: Context) => {
	const censorIp = (ip: string): string => {
		if (!ip || ip === "unknown") return ip;

		if (ip.includes(".")) {
			const parts = ip.split(".");
			return `${parts[0]}.${parts[1]}.${parts[2]}.xxx`;
		}

		if (ip.includes(":")) {
			const parts = ip.split(":");
			return `${parts.slice(0, 3).join(":")}:xxxx:xxxx:xxxx:xxxx:xxxx`;
		}

		return "xxx.xxx.xxxx.xxx";
	};

	const cfIp = c.req.header("cf-connecting-ip");
	if (cfIp) return censorIp(cfIp);

	const forwardedFor = c.req.header("x-forwarded-for");
	if (forwardedFor) return censorIp(forwardedFor.split(",")[0].trim());

	const realIp = c.req.header("x-real-ip");
	if (realIp) return censorIp(realIp);

	const connInfo = getConnInfo(c);

	return censorIp(connInfo.remote.address || "0.0.0.0");
};
