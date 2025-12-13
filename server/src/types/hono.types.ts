import { User, Session } from "better-auth";

declare module "Hono" {
  interface ContextVariableMap {
    user: User;
    session: Session;
  }
}
