const enableNotificationsButtons = document.querySelectorAll('.enable-notifications'); 

const askForNotificationPermission = () => { 
      Notification.requestPermission(result => { 
      if(result === 'granted') { 
          displayConfirmNotification();
          // configurePushSubscription(); 
      } 
   });
};

if('Notification' in window) {
      for(let i = 0; i < enableNotificationsButtons.length; i++) {
          enableNotificationsButtons[i].style.display = 'inline-block'; 
          enableNotificationsButtons[i].addEventListener('click', askForNotificationPermission); 
      }
}

const displayConfirmNotification = () => { 
    if('serviceWorker' in navigator) {
       const options= {
             body: 'You successfully subscribed to our Notification service!',
             icon: '/assets/logo.png',
             image: '/assets/logo.png',
             dir: 'ltr',
             lang: 'en-US',
             badge: '/assets/logo.png',
             tag: 'confirm-notification',
             actions: [
                {
                     action: 'confirm',
                     title: 'Okay',
                     icon: '/assets/logo.png'
                 }, 
                 {
                     action: 'cancel',
                     title: 'Cancel',
                     icon: '/assets/logo.png'
                 } 
             ]
      }; 
      navigator.serviceWorker.ready
        .then(sw => sw.showNotification('update order', options));
    }
};


displayConfirmNotification();