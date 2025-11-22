import { agenda } from './agenda.js';
import Subscription from '../models/subscription.model.js';
import dayjs from 'dayjs';

const REMINDERS = [7, 5, 3, 2, 1];

export const scheduleAllReminders = async () => {
  const subscriptions = await Subscription.find({ status: 'active' });

  for (const subscription of subscriptions) {
    const renewalDate = dayjs(subscription.renewalDate);

    for (const daysBefore of REMINDERS) {
      const reminderDate = renewalDate.subtract(daysBefore, 'day').toDate();
      if (reminderDate > new Date()) {
        await agenda.schedule(reminderDate, 'send subscription reminder', {
          subscriptionId: subscription._id,
          daysBefore,
        });
        console.log(`Scheduled ${daysBefore}-day reminder for ${subscription.name}`);
      }
    }
  }
};
