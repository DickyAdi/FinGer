import { Hono } from "hono";
import * as auth from "./auth.route";
import * as transaction from "./transaction.route";
import * as income from "./income.route";
import * as expense from "./expense.route";

export const router = new Hono();

router.route("/", auth.authRouter);
router.route("/", transaction.transactionRouter);
router.route("/", income.incomeRouter);
router.route("/", expense.expensesRouter);
