import { conflictError } from "@/errors";
import { FirewallTrendsBiggestValueOutputDBParams, FirewallTrendsBiggestValueOutputParams, HostListOutputDBParams, ItemsByHostOutputDBParams } from "@/protocols";
import { getFirewallMonthlyTrendsRepository, getHostsByHostGroupsRepository } from "@/repositories";
import { getItemsByHostRepository } from "@/repositories/items-repository";
import moment from "moment";

export async function getFirewallMonthlyTrendsService(start:string, end: string, value: string) {
    const firewallGroup = 516;

    //verificar se end é depois de start
    if(moment(end).isBefore(moment(start))){
        throw conflictError("o mês final não pode ser maior que o mês inicial!");
    }

    const hostsList: HostListOutputDBParams[] | any = await getHostsByHostGroupsRepository(firewallGroup);

    //se for mais de 1 mês de diferença devo pegar todos;
    const monthDiff = monthDifference(start, end);
    console.log(monthDiff);

    const response: FirewallTrendsBiggestValueOutputParams[]  = [];
    
    for (let i = 0; i < hostsList.length; i++) {
        const host = hostsList[i].hostid;
        const itemsByHost: ItemsByHostOutputDBParams[] | any = await getItemsByHostRepository(host);
        const responseValues = [];
        console.log(host, itemsByHost.length);
        for (let j = 0; j < itemsByHost.length; j++) {
            const item = itemsByHost[j].itemid;
            let monthChange = start;
            for (let k = 0; k < monthDiff; k++) {
                const momentData = moment(monthChange, 'YYYY-MM').startOf('month');
                const endMonthChange = momentData.add(1, 'month').format('YYYY-MM');

                const startFormatted = `${monthChange}-01 00:00:00`;
                const endFormatted = `${endMonthChange}-01 00:00:00`;

                const trendBiggestValues: FirewallTrendsBiggestValueOutputDBParams[] | any = await getFirewallMonthlyTrendsRepository(item, startFormatted, endFormatted, value);
                const formattedMonth = {
                    month: monthChange,
                    bits: trendBiggestValues[0]
                }
                responseValues.push(formattedMonth);
                monthChange = endMonthChange;
            }
        }
        const formattedValues = {
            hostid: hostsList[i].hostid,
            hostName: hostsList[i].hostName,
            values: responseValues
        }
        response.push(formattedValues);
    }
    
    return response;
}

function monthDifference(month1: string, month2: string) {
    // Converter as strings para objetos Moment.js
    const momentData1 = moment(month1, 'YYYY-MM').startOf('month');
    const momentData2 = moment(month2, 'YYYY-MM').startOf('month');
  
    // Calcular a diferença em meses
    const monthDiff = momentData2.diff(momentData1, 'months');
  
    return monthDiff;
  }