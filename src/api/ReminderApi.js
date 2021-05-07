import SERVER from './serverUrl';

const SERVER_URL = `${SERVER}/reminders`;

class ReminderApi {
    static getAllReminders() {
      return fetch(SERVER_URL).then(response => response.json());
    }

    static saveReminder(reminder) {
      if (reminder.id) {
        return fetch(`${SERVER_URL}/${reminder.id}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reminder)
        }).then(response => response.json());
      } else {
        return fetch(SERVER_URL, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reminder)
        }).then(response => response.json());
      }
    }

    static deleteReminder(reminderId) {
        return fetch(`${SERVER_URL}/${reminderId}`, {method:'delete'});
    }


    static getReminder(reminderId) {
        return fetch(`${SERVER_URL}/${reminderId}`).then(response => response.json());
    }

}

export default ReminderApi;
