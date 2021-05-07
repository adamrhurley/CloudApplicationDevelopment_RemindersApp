import React from 'react';
import { Field, reduxForm } from 'redux-form';
import FieldInput from '../common/FieldInput';
import SelectInput from '../common/SelectInput';


export const ReminderForm = ({ handleSubmit, pristine, reset, submitting, heading, authors, handleSave, handleCancel }) => {
    return (
        <form onSubmit={handleSubmit(handleSave)}>
            <h1>{heading}</h1>

            <Field
                type="text"
                name="title"
                label="Title"
                placeholder="Title of the reminder"
                component={FieldInput}
            />


            <Field
                type="text"
                name="description"
                label="destcription"
                placeholder="Reminder description"
                component={FieldInput}
            />

            <Field
                type="text"
                name="dueDate"
                label="Due Date"
                placeholder="Date the reminder is due"
                component={FieldInput}
            />
			
			<Field
			type="text"
                name="importance"
                label="Importance"
                component={FieldInput}
            />
			
			/*<input 
				type='hidden' 
				name="username"
			/>*/
            <div>
                <button type="submit" disabled={submitting} className="btn btn-primary"><i className="fa fa-paper-plane-o" aria-hidden="true" /> Submit</button>

                {heading === 'Add' && <button type="button" disabled={pristine || submitting} onClick={reset} className="btn btn-default btn-space">Clear Values</button>}

                <button type="button" className="btn btn-default btn-space" onClick={handleCancel}>Cancel</button>
            </div>
        </form>
    );
};





const validate = values => {
    const errors = {};

    if (!values.title) {
        errors.title = 'Required';
    }

    if (!values.description) {
        errors.description = 'Required';
    }

    if (!values.dueDate) {
        errors.dueDate = 'Required';
    }

    if (!values.importance) {
        errors.importance = 'Required';
    }

    return errors;
};



export default reduxForm({
    form: 'ReminderForm',
    validate
})(ReminderForm);
