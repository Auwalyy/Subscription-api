import Agenda from 'agenda';
import Subscription from '../models/subscription.model.js';
import { DB_URI } from './env.js';  
// Connect Agenda to MongoDB
export const agenda = new Agenda({
  db: { address: DB_URI, collection: 'agendaJobs' },
});

// Define the reminder job
agenda.define('send subscription reminder', async (job) => {
  const { subscriptionId, daysBefore } = job.attrs.data;
  const subscription = await Subscription.findById(subscriptionId).populate('user');
  if (!subscription) return;

  console.log(
    `Reminder: ${daysBefore} day(s) before renewal for subscription "${subscription.name}" of user "${subscription.user.email}"`
  );

  // TODO: Send email, SMS, push notification, etc.
});

// Start Agenda
(async function () {
  await agenda.start();
  console.log('Agenda started...');
})();
