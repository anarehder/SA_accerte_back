import { getFirewallMonthlyTrendsController } from "@/controllers";
import { Router } from "express";

const firewallTrendsRouter = Router();

firewallTrendsRouter.get("/", getFirewallMonthlyTrendsController);

export {firewallTrendsRouter}