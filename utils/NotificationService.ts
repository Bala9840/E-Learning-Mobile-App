import * as Notifications from 'expo-notifications';
import { Platform, Alert } from 'react-native';

// 1. Setup Notification Handler (Foreground)
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
    }),
});

// 2. Request Permissions
export async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }

    if (finalStatus !== 'granted') {
        Alert.alert('Permission needed', 'Failed to get push token for push notification!');
        return;
    }

    // We don't necessarily need the token for local notifications, but it's good practice
    // token = (await Notifications.getExpoPushTokenAsync()).data;
    return finalStatus;
}

// 3. Schedule Notification
export async function scheduleNotification(title: string, body: string, triggerDate: Date) {
    try {
        const now = new Date();
        const seconds = (triggerDate.getTime() - now.getTime()) / 1000;

        if (seconds <= 0) {
            Alert.alert("Time Error", "Please select a future time.");
            return;
        }

        await Notifications.scheduleNotificationAsync({
            content: {
                title: title,
                body: body,
                sound: true,
            },
            trigger: {
                type: Notifications.SchedulableTriggerInputTypes.DATE,
                date: triggerDate,
            },
        });

        // Alert.alert("Success", "Reminder set successfully!");
    } catch (e) {
        console.error("Schedule Error: ", e);
        Alert.alert("Error", "Failed to schedule reminder.");
    }
}
