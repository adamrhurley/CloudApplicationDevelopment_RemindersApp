import * as ActionType from './ActionType';
import ReminderApi from '../api/ReminderApi';
import { ApiCallBeginAction, ApiCallErrorAction } from './ApiAction';



export const getRemindersResponse = reminders => ({
    type: ActionType.GET_REMINDERS_RESPONSE,
    reminders
});



export function getRemindersAction() {
    return (dispatch) => {

        dispatch(ApiCallBeginAction());

        return ReminderApi.getAllReminders()
            .then(reminders => {
                dispatch(getRemindersResponse(reminders));
            }).catch(error => {
                throw error;
            });
    };
}



export const addNewReminderResponse = () => ({
    type: ActionType.ADD_NEW_REMINDER_RESPONSE
});



export const updateExistingReminderResponse = () => ({
    type: ActionType.UPDATE_EXISTING_REMINDER_RESPONSE
});



export function saveReminderAction(reminderBeingAddedOrEdited) {
    return function (dispatch) {

        dispatch(ApiCallBeginAction());

        //if authorId exists, it means that the course is being edited, therefore update it.
        //if authorId doesn't exist, it must therefore be new course that is being added, therefore add it
        return ReminderApi.saveReminder(reminderBeingAddedOrEdited)
            .then(() => {
                if (reminderBeingAddedOrEdited.id) {
                    dispatch(updateExistingReminderResponse());
                } else {
                    dispatch(addNewReminderResponse());
                }
            }).then(() => {
                dispatch(getRemindersAction());
            }).catch(error => {
                dispatch(ApiCallErrorAction());
                throw (error);
            });
    };
}



export const getReminderResponse = reminderFound => ({
    type: ActionType.GET_REMINDER_RESPONSE,
    reminder: reminderFound
});



export function getReminderAction(reminderId) {
    return (dispatch) => {

        dispatch(ApiCallBeginAction());

        return ReminderApi.getReminder(reminderId)
            .then(reminder => {
                dispatch(getReminderResponse(reminder));
            }).catch(error => {
                throw error;
            });
    };
}



export const deleteReminderResponse = () => ({
    type: ActionType.DELETE_REMINDER_RESPONSE
});



export function deleteReminderAction(reminderId) {
    return (dispatch) => {

        dispatch(ApiCallBeginAction());

        return ReminderApi.deleteReminder(reminderId)
            .then(() => {
                dispatch(deleteReminderResponse());
            }).then(() => {
                dispatch(getRemindersAction());
            }).catch(error => {
                throw error;
            });
    };
}