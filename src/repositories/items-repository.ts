import { db } from "@/config/database";

export async function getItemsByHostRepository(hostid: number) {
    const response = await db.query (
        `SELECT 
            items.itemid, 
            hosts.name AS hostName,
            items.hostid,
            items.name AS itemName,
            interface.ip
        FROM 
            items
        JOIN
            hosts ON hosts.hostid = items.hostid
        LEFT JOIN
            interface ON interface.hostid = hosts.hostid
        WHERE
            items.hostid = ?
            AND items.name like '%port%'
            AND items.name like '%Bits%'
            AND items.name NOT LIKE '%HA%'
        ORDER BY
            items.name ASC;`,
        [hostid]
    );
    return response[0];
}