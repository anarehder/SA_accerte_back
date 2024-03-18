import { FirewallTrendsBiggestValueOutputDBParams, FirewallTrendsBiggestValueOutputParams, HostListOutputDBParams, ItemsByHostOutputDBParams } from "@/protocols";
import { getFirewallMonthlyTrendsRepository, getHostsByHostGroupsRepository } from "@/repositories";
import { getItemsByHostRepository } from "@/repositories/items-repository";

export async function getFirewallMonthlyTrendsService() {
    const firewallGroup = 516;

    const start = '2023-12-01 00:00:00';
    const end = '2024-01-01 00:00:00'; 
    const value = 'value_avg';

    const response: FirewallTrendsBiggestValueOutputParams[]  = [];

    const hostsList: HostListOutputDBParams[] | any = await getHostsByHostGroupsRepository(firewallGroup);
    
    for (let i = 0; i < hostsList.length; i++) {
        const itemsByHost: ItemsByHostOutputDBParams[] | any = await getItemsByHostRepository(hostsList[i]);
        for (let j = 0; j < itemsByHost.length; j++) {
            const item = itemsByHost[j].itemid;
            const trendBiggestValues: FirewallTrendsBiggestValueOutputDBParams[] | any = await getFirewallMonthlyTrendsRepository(item, start, end, value);
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