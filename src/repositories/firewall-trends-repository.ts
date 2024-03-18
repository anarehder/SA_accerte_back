import { db } from "@/config/database";

export async function getFirewallMonthlyTrendsRepository(itemid: number, start: string, end: string, value: string) {
    const response = await db.query (
        `SELECT 
            hosts.hostid,
            hosts.name AS hostName,
            interface.ip AS ip,
            items.name AS itemName,
            items.itemid,
            REPLACE(FORMAT(${value} * 1E-6, 4), '.', ',') AS mbps,
            FROM_UNIXTIME(clock) AS dateTime    
        FROM
            trends_uint
                LEFT JOIN
            items ON items.itemid = trends_uint.itemid
                LEFT JOIN
            hosts ON hosts.hostid = items.hostid
                LEFT JOIN
            interface ON interface.hostid = hosts.hostid
        WHERE
            trends_uint.itemid = ?
            AND FROM_UNIXTIME(clock) >= ?
            AND FROM_UNIXTIME(clock) < ?
        ORDER BY 
            ? DESC
        LIMIT 1;`,
        [itemid, start, end, value]
    );
    return response[0];
}