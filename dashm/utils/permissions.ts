import { Geolocation } from '@capacitor/geolocation';
import { Camera } from '@capacitor/camera';
import { PushNotifications } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';

export const requestAllPermissions = async () => {
  if (!Capacitor.isNativePlatform()) return;

  try {
    // 1. Geolocation
    const geoStatus = await Geolocation.checkPermissions();
    if (geoStatus.location !== 'granted') {
      await Geolocation.requestPermissions();
    }

    // 2. Camera
    const cameraStatus = await Camera.checkPermissions();
    if (cameraStatus.camera !== 'granted') {
      await Camera.requestPermissions();
    }

    // 3. Notifications (Android 13+)
    const pushStatus = await PushNotifications.checkPermissions();
    if (pushStatus.receive !== 'granted') {
      await PushNotifications.requestPermissions();
    }
  } catch (err) {
    console.error('Error requesting permissions:', err);
  }
};
