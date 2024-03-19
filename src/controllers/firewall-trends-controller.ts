import httpStatus from "http-status";
import { Request, Response } from "express";
import { getFirewallMonthlyTrendsService } from "@/services";

export async function getFirewallMonthlyTrendsController(req: Request, res: Response) {
    console.log(req.body);
    try{
        const response = await getFirewallMonthlyTrendsService();
        return res.status(httpStatus.OK).send(response);
    } catch(error) {
        return res.status(httpStatus.BAD_REQUEST).send(error);
    }
}