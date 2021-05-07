import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import remindersReducer from './remindersReducer';
import selectedReminderReducer from './selectedReminderReducer';
import authorReducer from './authorReducer';
import apiReducer from './apiReducer';

export default combineReducers({
    remindersReducer,
    selectedReminderReducer,
    authorReducer,
    apiReducer,
    form: formReducer    
});


