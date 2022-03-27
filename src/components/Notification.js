import React from 'react';

// Shows notification when the user enters a bad word or wins the game
function Notification({ notification }) {
    // Doesn't show anything if there is no notification
    if (notification.length > 0) {
        return (
            // Based on the first entry of notification, decides if we are showing an error or regular notification
            // (changes background color)
            <div className={notification[0] ? "error" : "notification"}>
                {notification}
            </div>
        )
    } else {
        return <div></div>
    }
}

export default Notification;