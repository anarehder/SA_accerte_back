import { FirewallTrendsBiggestValueOutputDBParams, FirewallTrendsBiggestValueOutputParams, HostListOutputDBParams, ItemsByHostOutputDBParams } from "@/protocols";
import { getFirewallMonthlyTrendsRepository, getHostsByHostGroupsRepository } from "@/repositories";
import { getItemsByHostRepository } from "@/repositories/items-repository";
import moment from "moment";

export async function getFirewallMonthlyTrendsService(start:string, end: string, value: string) {
    const firewallGroup = 516;

    //verificar se end é depois de start
    const startFormatted = `${start}-01 00:00:00`;
    const endFormatted = `${end}-01 00:00:00`;

    //se for mais de 1 mês de diferença devo pegar todos;
    const monthDiff = monthDifference(start, end);
    console.log(monthDiff);
    const response: FirewallTrendsBiggestValueOutputParams[]  = [];

    const hostsList: HostListOutputDBParams[] | any = await getHostsByHostGroupsRepository(firewallGroup);
    
    for (let i = 0; i < hostsList.length; i++) {
        const itemsByHost: ItemsByHostOutputDBParams[] | any = await getItemsByHostRepository(hostsList[i]);
        for (let j = 0; j < itemsByHost.length; j++) {
            const item = itemsByHost[j].itemid;
            const trendBiggestValues: FirewallTrendsBiggestValueOutputDBParams[] | any = await getFirewallMonthlyTrendsRepository(item, startFormatted, endFormatted, value);
            const formattedValues = {
                hostid: hostsList[i].hostid,
                hostName : hostsList[i].hostName,
                values: trendBiggestValues[0]
            }
            response.push(formattedValues);
        }
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