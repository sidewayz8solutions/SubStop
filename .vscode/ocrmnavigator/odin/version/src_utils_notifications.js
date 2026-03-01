import * as Notifications from 'expo-notifications';

// 1. Tell iOS to show the alert even if the user is actively using the app
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// 2. Ask the user for permission the first time they open the app
export async function requestLocalPermissions() {
  const { status } = await Notifications.getPermissionsAsync();
  if (status !== 'granted') {
    await Notifications.requestPermissionsAsync();
  }
}

// 3. The Math: Schedule the 5-Day and 24-Hour Alarms
export async function scheduleSubReminders(subName, nextBillingDate) {
  const billDate = new Date(nextBillingDate);
  const now = new Date();

  // Calculate 5 days before at 10:00 AM
  const fiveDaysBefore = new Date(billDate);
  fiveDaysBefore.setDate(fiveDaysBefore.getDate() - 5);
  fiveDaysBefore.setHours(10, 0, 0, 0);

  // Calculate 1 day before at 10:00 AM
  const oneDayBefore = new Date(billDate);
  oneDayBefore.setDate(oneDayBefore.getDate() - 1);
  oneDayBefore.setHours(10, 0, 0, 0);

  // Set the 5-day alarm (if that date hasn't already passed)
  if (fiveDaysBefore > now) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Upcoming Bill 🚨",
        body: `${subName} renews in 5 days! Cancel now if you don't use it.`,
        sound: true,
      },
      trigger: fiveDaysBefore,
    });
  }

  // Set the 24-hour alarm (if that date hasn't already passed)
  if (oneDayBefore > now) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Bill Due Tomorrow! 💸",
        body: `${subName} charges you tomorrow. Use the Smart Router to cancel it now!`,
        sound: true,
      },
      trigger: oneDayBefore,
    });
  }
}