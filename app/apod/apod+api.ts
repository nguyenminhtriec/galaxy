
import { getRandomDate } from "@/lib/helper";

export async function POST(req: Request) {
    const baseUrl = process.env.APOD_BASE_URL;
    const {startDate} = await req.json();
    const params = harmonizeParams(startDate);

    const url = `${baseUrl}?${params.toString()}`
    console.log("Getting data from", url);
    const response = await fetch(url, {});
    if (!response.ok) {
        return Response.json({error: "Failed to fetch data from APOD API"}, {status: 500});
    }
    const data = await response.json();
    return Response.json(data);
}

function harmonizeParams(date: string, offset=3) {
    const apiKey: string = process.env.APOD_API_KEY || '';   
    const params = new URLSearchParams();
    const endDate = dateOffset(date, 3);
    const simpleEndDate = simpleDate(endDate);
    const startDate = new Date(date).toISOString();
    const simpleStartDate = simpleDate(startDate);

    params.set('date_from', simpleStartDate);
    params.set('date_to', simpleEndDate);
    params.set('api_key', apiKey);
    
    return params;
}

function dateOffset(date: string, offset: number) {
    const stamp = Date.parse(date);
    const offsetMillis = offset * 24 * 3600 * 1000;
    const newStamp = Math.min(stamp + offsetMillis, Date.now());
    return new Date(newStamp).toISOString().split('T')[0];
}

// Convert ISO date string to simple form (YYMMDD)
function simpleDate(dateStr: string) {
    const isoDate = new Date(dateStr).toISOString().split('T')[0];
    const simple = isoDate.split('-').join('').substring(2)
    return simple
}
