import moment, { Moment, MomentBuiltinFormat } from "moment";

export default class DateTime {
  private momentData: Moment;

  constructor(
    dateString: string = null,
    format: string | MomentBuiltinFormat = moment.ISO_8601
  ) {
    let date = dateString ? dateString : new Date();
    this.momentData = moment(date, format, true);
  }

  format(
    formatString: string | MomentBuiltinFormat = "DD/MM/YYYY [às] HH:mm"
  ): string {
    return this.momentData.format(formatString.toString());
  }
}
