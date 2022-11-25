type Job = {
  id: number;
  message: string;
  sendAt?: string;
  cron?: string;
};

const jobs: Job[] = [
  { id: 1, message: 'first message', sendAt: '2022-11-25 16:40:00' },
  { id: 2, message: 'second message', cron: '* */12 * * * *' },
  { id: 3, message: 'third message', cron: '*/10 * * * * *' },
];
export default jobs;
