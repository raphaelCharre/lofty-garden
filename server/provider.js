import { cron } from 'node-cron';
 
cron.schedule('20 * * * *', () => {
  console.log('running a task every 20s');
});
