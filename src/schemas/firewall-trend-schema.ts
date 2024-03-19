import { FirewallTrendsInputParams } from "../protocols";
import Joi from "joi";

export const firewallTrendsSchema = Joi.object<FirewallTrendsInputParams>({
    start: Joi.string().regex(/^\d{4}-\d{2}$/).required(),
    end: Joi.string().regex(/^\d{4}-\d{2}$/).required(),
    value: Joi.string().valid('value_avg', 'value_max').required(),
})