
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
    const apiKey: string = process.env.NASA_API_KEY || '';
    const stamp = Date.parse(date);
    const params = new URLSearchParams();
    if (stamp > Date.now() || stamp < Date.parse("1995-06-16")) {
        const randomDate = getRandomDate();
        params.set('start_date', randomDate);
        params.set('end_date', dateOffset(randomDate, offset));
        params.set('api_key', apiKey);
    } else {
        params.set('start_date', date);
        params.set('end_date', dateOffset(date, offset));
        params.set('api_key', apiKey);
    }
    return params;
}

function dateOffset(date: string, offset: number) {
    const stamp = Date.parse(date);
    const offsetMillis = offset * 24 * 3600 * 1000;
    const newStamp = Math.min(stamp + offsetMillis, Date.now());
    return new Date(newStamp).toISOString().split('T')[0];
}