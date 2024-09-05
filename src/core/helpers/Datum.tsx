export default class Datum extends Date {
    toISOString(): string {
        const year = this.getFullYear();
        const month = (this.getMonth() + 1).toString().padStart(2, '0');
        const date = this.getDate().toString().padStart(2, '0');

        return `${year}-${month}-${date}`
    }

    daysToTime(days: number = 1): number {
        return 1000 * 60 * 60 * 24 * days
    }

    addDays(days: number = 1): Datum {
        const time = this.getTime() + this.daysToTime(days);
        return new Datum(time);
    }
}