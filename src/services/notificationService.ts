import { IMessage } from '../types/Chat';

class NotificationService {
  private sound = new Audio('https://assets.mixkit.co/active_storage/sfx/2358/2358-preview.mp3');

  constructor() {
    this.requestPermission();
  }

  async requestPermission() {
    if (!('Notification' in window)) {
      console.warn('This browser does not support desktop notification');
      return;
    }

    if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
      await Notification.requestPermission();
    }
  }

  playNotificationSound() {
    this.sound.play().catch(err => console.warn('Could not play notification sound:', err));
  }

  showNotification(message: IMessage) {
    console.log('🔔 Attempting to show notification. Permission status:', Notification.permission);
    
    if (Notification.permission === 'granted') {
      try {
        const title = `New Message from ${message.sender?.username || 'Someone'}`;
        const options = {
          body: message.type === 'TEXT' ? message.content : `Sent a ${message.type.toLowerCase()}`,
          icon: `https://ui-avatars.com/api/?name=${message.sender?.username || 'User'}&background=4f46e5&color=fff`,
          tag: 'new-message', // Avoid stacking multiple notifications
          silent: true, // We play our own sound
        };

        const notification = new Notification(title, options);

        notification.onclick = () => {
          window.focus();
          notification.close();
        };
      } catch (error) {
        console.error('❌ Error creating notification:', error);
      }
    } else if (Notification.permission !== 'denied') {
      this.requestPermission();
    }
  }

  notify(message: IMessage) {
    this.playNotificationSound();
    this.showNotification(message);
  }
}

export const notificationService = new NotificationService();
