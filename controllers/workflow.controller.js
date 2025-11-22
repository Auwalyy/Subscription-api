import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { serve } = require('@upstash/workflow/express');

import dayjs from 'dayjs';
import Subscription from '../models/subscription.model.js';

const REMINDERS = [7, 5, 3, 2, 1]; // days before renewal

export const sendReminders = serve(async (context) => {
  const { subscriptionId } = context.requestPayload;
  if (!subscriptionId) {
    return { success: false, message: 'subscriptionId not provided' };
  }

  const subscription = await Subscription.findById(subscriptionId).populate('user');
  if (!subscription || subscription.status !== 'active') {
    return { success: false, message: 'Subscription not found or inactive' };
  }

  const renewalDate = dayjs(subscription.renewalDate);
  if (renewalDate.isBefore(dayjs())) {
    console.log(`Subscription ${subscription.name} already expired.`);
    return { success: false, message: 'Subscription already expired' };
  }

  console.log(`Processing reminders for subscription: ${subscription.name}`);

  for (const daysBefore of REMINDERS) {
    const reminderDate = renewalDate.subtract(daysBefore, 'day');
    if (reminderDate.isAfter(dayjs())) {
      console.log(`Scheduling reminder ${daysBefore} days before renewal (${reminderDate.toDate()})`);
      await context.sleepUnit(`Reminder ${daysBefore} days before`, reminderDate.toDate());
      await triggerReminder(context, `Reminder ${daysBefore} days before`, subscription);
    }
  }

  return { success: true, subscriptionId };
});

const triggerReminder = async (context, label, subscription) => {
  console.log(`Triggering ${label} for subscription ${subscription.name}`);
  // TODO: send email, SMS, push notification, etc.
};

export default sendReminders;
