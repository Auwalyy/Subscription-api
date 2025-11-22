import Subscription from '../models/subscription.model.js';
import { agenda } from '../config/agenda.js';
import dayjs from 'dayjs';

// Days before renewal to send reminders
const REMINDERS = [7, 5, 3, 2, 1];

export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });

    const renewalDate = dayjs(subscription.renewalDate);

    // Schedule reminders using Agenda
    for (const daysBefore of REMINDERS) {
      const reminderDate = renewalDate.subtract(daysBefore, 'day').toDate();
      if (reminderDate > new Date()) {
        await agenda.schedule(reminderDate, 'send subscription reminder', {
          subscriptionId: subscription._id,
          daysBefore,
        });
      }
    }

    res.status(201).json({ success: true, data: subscription });
  } catch (error) {
    next(error);
  }
};

// Get subscriptions for a specific user
export const getUserSubscriptions = async (req, res, next) => {
  try {
    if (req.user._id.toString() !== req.params.id) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    const subscriptions = await Subscription.find({ user: req.params.id });
    res.status(200).json({ success: true, data: subscriptions });
  } catch (error) {
    next(error);
  }
};

// Get upcoming renewals within next X days
export const getUpcomingRenewals = async (req, res, next) => {
  try {
    const days = Math.max(parseInt(req.query.days) || 7, 1);
    const now = dayjs();
    const endDate = now.add(days, 'day');

    console.log("Searching subscriptions from", now.toDate(), "to", endDate.toDate());

    const subscriptions = await Subscription.find({
      renewalDate: { $gte: now.toDate(), $lte: endDate.toDate() },
      status: 'active',
    }).sort({ renewalDate: 1 });

    console.log("Found subscriptions:", subscriptions);

    res.status(200).json({ success: true, data: subscriptions });
  } catch (error) {
    next(error);
  }
};
