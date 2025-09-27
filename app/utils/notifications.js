import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiPost } from './api';

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Register for push notifications
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

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    if (finalStatus !== 'granted') {
      console.log('Failed to get push token for push notification!');
      return;
    }
    
    try {
      token = await Notifications.getExpoPushTokenAsync({
        projectId: 'your-project-id', // Replace with your actual project ID
      });
      console.log('Push token:', token.data);
      
      // Store token locally
      await AsyncStorage.setItem('pushToken', token.data);
      
    } catch (error) {
      console.error('Error getting push token:', error);
    }
  } else {
    console.log('Must use physical device for Push Notifications');
  }

  return token?.data;
}

// Send push token to server
export async function sendPushTokenToServer() {
  try {
    const token = await AsyncStorage.getItem('pushToken');
    const userData = await AsyncStorage.getItem('userData');
    
    if (!token || !userData) {
      console.log('No push token or user data available');
      return;
    }
    
    const user = JSON.parse(userData);
    
    const response = await apiPost('/api/notifications/register-token.php', {
      user_id: user.id,
      push_token: token,
      device_type: Platform.OS,
    });
    
    const result = await response.json();
    
    if (result.success) {
      console.log('Push token registered successfully');
    } else {
      console.error('Failed to register push token:', result.message);
    }
    
  } catch (error) {
    console.error('Error sending push token to server:', error);
  }
}

// Schedule a local notification
export async function scheduleLocalNotification(title, body, data = {}, trigger = null) {
  try {
    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data,
        sound: 'default',
      },
      trigger: trigger || null, // null means immediate
    });
    
    console.log('Local notification scheduled:', notificationId);
    return notificationId;
  } catch (error) {
    console.error('Error scheduling local notification:', error);
  }
}

// Cancel a scheduled notification
export async function cancelNotification(notificationId) {
  try {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
    console.log('Notification cancelled:', notificationId);
  } catch (error) {
    console.error('Error cancelling notification:', error);
  }
}

// Cancel all scheduled notifications
export async function cancelAllNotifications() {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
    console.log('All notifications cancelled');
  } catch (error) {
    console.error('Error cancelling all notifications:', error);
  }
}

// Get notification permissions status
export async function getNotificationPermissions() {
  try {
    const permissions = await Notifications.getPermissionsAsync();
    return permissions;
  } catch (error) {
    console.error('Error getting notification permissions:', error);
    return null;
  }
}

// Handle notification received while app is in foreground
export function addNotificationReceivedListener(callback) {
  return Notifications.addNotificationReceivedListener(callback);
}

// Handle notification response (when user taps on notification)
export function addNotificationResponseReceivedListener(callback) {
  return Notifications.addNotificationResponseReceivedListener(callback);
}

// Remove notification listeners
export function removeNotificationSubscription(subscription) {
  if (subscription) {
    Notifications.removeNotificationSubscription(subscription);
  }
}
