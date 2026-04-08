export class DateUtil {
  static format(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  static addDays(days: number): string {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return this.format(date);
  }
}
