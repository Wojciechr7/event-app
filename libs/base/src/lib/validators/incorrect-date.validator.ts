import * as moment from "moment";

export function incorrectDateValidator(day: number, month: number) {
  const year = moment().get('year');
  return !moment(`${year}-${month}-${day}`, 'YYYY-M-D').parseZone().isValid();
}
