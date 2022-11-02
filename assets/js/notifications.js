const enableNotificationsButtons = document.querySelectorAll('.enable-notifications'); 

Notification.requestPermission(result => { 
    if(result === 'granted') { 
          $(enableNotificationsButtons).css('display', 'none')
    } 
})

const askForNotificationPermission = () => { 
      Notification.requestPermission(result => { 
      if(result === 'granted') { 
        $(enableNotificationsButtons).css('display', 'none')
            displayConfirmNotification();
      } 
   });
};

if('Notification' in window) {
      for(let i = 0; i < enableNotificationsButtons.length; i++) {
          enableNotificationsButtons[i].style.display = 'flex'; 
          enableNotificationsButtons[i].addEventListener('click', askForNotificationPermission); 
      }
}

const displayConfirmNotification = () => { 
    if('serviceWorker' in navigator) {
       const options= {
             body: 'You order is ready!',
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