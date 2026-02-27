import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export const requestPermissions = async () => {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  return finalStatus === 'granted';
};

export const scheduleRenewalReminder = async (name, daysFromNow) => {
  // Simplification for MVP: triggers a set number of days from now.
  // In a V2, you'd calculate exact dates based on a calendar picker.
  const trigger = new Date(Date.now() + daysFromNow * 24 * 60 * 60 * 1000);

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Action Required 🚨',
      body: `Your ${name} subscription is renewing soon. Cancel it now if you don't need it.`,
    },
    trigger,
  });
};
