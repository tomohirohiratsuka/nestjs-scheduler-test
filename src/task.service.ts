import { Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import jobs from "database/jobs";
import { parseExpression } from "cron-parser";

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  @Cron("* * * * * *")
  handleCron() {
    const now = new Date();
    const strNow = this.convertDateToStr(now);
    //TODO: get all jobs from actual database.
    jobs
      .filter((j) => j.sendAt)
      .map((job) => {
        if (job.sendAt === strNow) {
          //TODO: send message
          this.logger.log(
            `now matched to send_at. sendAt:${job.sendAt}, strNow: ${strNow}`
          );
        }
        return;
      });
    jobs
      .filter((j) => j.cron)
      .map((job) => {
        const cronNextDateString = this.convertDateToStr(parseExpression(job.cron).next().toDate());
        if (this.match(job.cron, now)) {
          //TODO: send message
          this.logger.log(
            `now matched to cron. cron:${job.cron}, cronStr(next):${cronNextDateString}, strNow:${strNow}`
          );
        }
      });
  }

  convertDateToStr(date: Date): string {
    const m = (date.getMonth() + 1).toString().padStart(2, "0");
    const d = date.getDate().toString().padStart(2, "0");
    const h = date.getHours().toString().padStart(2, "0");
    const mm = date.getMinutes().toString().padStart(2, "0");
    const ss = date.getSeconds().toString().padStart(2, "0");
    return `${date.getFullYear()}-${m}-${d} ${h}:${mm}:${ss}`;
  }
  match(expression: string, date: Date, scope = 'second') {
    const scopeIndex = [
      'second',
      'minute',
      'hour',
      'day',
      'month',
      'weekday',
    ].indexOf(scope.toLowerCase());
    try {
      const data = parseExpression(expression).fields;

      // @ts-ignore
      if (scopeIndex <= 0 && !data.second.includes(date.getSeconds())) return false;
      // @ts-ignore
      if (scopeIndex <= 1 && !data.minute.includes(date.getMinutes())) return false;
      // @ts-ignore
      if (scopeIndex <= 2 && !data.hour.includes(date.getHours())) return false;
      // @ts-ignore
      if (scopeIndex <= 3 && !data.dayOfMonth.includes(date.getDate())) return false;
      // @ts-ignore
      if (scopeIndex <= 4 && !data.month.includes(date.getMonth() + 1)) return false;
      // @ts-ignore
      if (scopeIndex <= 5 && !data.dayOfWeek.includes(date.getDay())) return false;

      return true;
    } catch (e) {
      return false;
    }
  }
}
