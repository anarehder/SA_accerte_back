import { getFirewallMonthlyTrendsController } from "@/controllers";
import { validateBody } from "@/middlewares/validation-middleware";
import { firewallTrendsSchema } from "@/schemas";
import { Router } from "express";

const firewallTrendsRouter = Router();

firewallTrendsRouter.get("/", validateBody(firewallTrendsSchema), getFirewallMonthlyTrendsController);

export {firewallTrendsRouter}