import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import * as reminderAction from '../../action/ReminderAction';
import * as authorAction from '../../action/AuthorAction';
import ReminderForm from './ReminderForm'; // eslint-disable-line import/no-named-as-default
import { authorsFormattedForDropdown } from '../../selectors/selectors'; // eslint-disable-line import/no-named-as-default


export class AddOrEditReminderContainer extends React.Component {


    constructor() {
        super();
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }



    componentDidMount() {
        this.props.action.getReminderAction(this.props.match.params.id)
            .catch(error => {
                toastr.error(error);
            });

        this.props.action.getAuthorsAction()
            .catch(error => {
                toastr.error(error);
            });
    }



    handleSave(values) {
        const reminder = {
            id: values.id,
            title: values.title,
            description: values.description,
            dueDate: values.dueDate,
            importance: values.importance
        };

        this.props.action.saveReminderAction(reminder)
            .then(() => {
                toastr.success('Reminder saved');
                this.props.history.push('/');
            }).catch(error => {
                toastr.error(error);
            });
    }



    handleCancel(event) {
        event.preventDefault();
        this.props.history.replace('/');
    }



    render() {
        const { initialValues } = this.props;
        const heading = initialValues && initialValues.id ? 'Edit' : 'Add';

        return (
            <div className="container">
                <ReminderForm
                    heading={heading}
                    authors={this.props.authors}
                    handleSave={this.handleSave}
                    handleCancel={this.handleCancel}
                    initialValues={this.props.initialValues}
                />
            </div>
        );
    }
}



const mapStateToProps = (state, ownProps) => {
    const reminderId = ownProps.match.params.id; //from the path '/reminder/:id'

    if (reminderId && state.selectedReminderReducer.reminder && reminderId === state.selectedReminderReducer.reminder.id) {
        return {
            initialValues: state.selectedReminderReducer.reminder,
            authors: authorsFormattedForDropdown(state.authorReducer.authors)
        };
    } else {
        return {
            authors: authorsFormattedForDropdown(state.authorReducer.authors)
        };
    }
};



const mapDispatchToProps = dispatch => ({
    action: bindActionCreators({ ...authorAction, ...reminderAction }, dispatch)
});



export default connect(mapStateToProps, mapDispatchToProps)(AddOrEditReminderContainer);
