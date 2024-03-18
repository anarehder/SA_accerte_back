import { db } from "@/config/database";

export async function getHostsByHostGroupsRepository(groupid: number) {
    const response = await db.query (
        `
        SELECT hosts_groups.hostid, hosts.name AS hostName
        FROM hosts_groups 
        JOIN hosts on hosts.hostid = hosts_groups.hostid
        WHERE groupid = ?;`,
        [groupid]
    );
    return response[0];
}