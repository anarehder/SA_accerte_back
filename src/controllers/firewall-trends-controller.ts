import httpStatus from "http-status";
import { Request, Response } from "express";
import { getFirewallMonthlyTrendsService } from "@/services";
import { FirewallTrendsInputParams } from "@/protocols";

export async function getFirewallMonthlyTrendsController(req: Request, res: Response) {
    const { start, end, value } = req.body as FirewallTrendsInputParams;
    try{
        const response = await getFirewallMonthlyTrendsService(start, end, value);
        return res.status(httpStatus.OK).send(response);
    } catch(error) {
        return res.status(httpStatus.BAD_REQUEST).send(error);
    }
}