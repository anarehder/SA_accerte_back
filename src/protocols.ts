export type ApplicationError = {
    name: string;
    message: string;
};

export type HostListOutputDBParams = {
    hostid: number;
    hostName: string;
};

export type FirewallTrendsBiggestValueOutputDBParams = {
    hostid: number;
    hostName: string;
    ip: string;
    itemName: string;
    itemid: number;
    mbps: number;
    dateTime: string;
}

export type ItemsByHostOutputDBParams = {
    itemid: number;
    hostName: string;
    hostid: number;
    itemName: string;
    ip: string;
}

export type FirewallTrendsBiggestValueOutputParams = {
    hostid: number;
    hostName: string;
    values: FirewallTrendsBiggestValueOutputDBParams[];
}

export type FirewallTrendsInputParams = {
    start: string;
    end: string;
    value: string;
}