import * as ActionType from '../action/ActionType';
import initialState from './initialState';
import _ from 'lodash';


const selectedReminderReducer = (state = initialState.selectedReminderReducer, action) => {
    switch(action.type) {

        case ActionType.GET_REMINDER_RESPONSE: {
            return {
                ...state,
                reminder: _.assign(action.reminder)
            };
        }


        default: { return state; }
    }
};


export default selectedReminderReducer;