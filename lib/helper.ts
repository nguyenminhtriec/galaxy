
// Desc: get a random date
export function getRandomDate() {
    const min = Date.parse("1995-6-16");
    const max = Date.now();
    const randomStamp = Math.floor(Math.random() * (max-min)) + min;
    const randomDate = new Date(randomStamp).toISOString().split("T")[0];
    return randomDate;
}