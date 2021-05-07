import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import * as reminderAction from '../../action/ReminderAction';
import ReminderList from './ReminderList';



export class ReminderListContainer extends React.Component {

    constructor() {
        super();

        this.state = {selectedReminderId: undefined};

        this.handleAddReminder = this.handleAddReminder.bind(this);
        this.handleEditReminder = this.handleEditReminder.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleRowSelect = this.handleRowSelect.bind(this);
    }


    componentDidMount() {
        this.props.action.getRemindersAction()
            .catch(error => {
                toastr.error(error);
            });
    }



    handleAddReminder() {
        this.props.history.push('/reminder');
    }



    handleEditReminder() {
        const selectedReminderId = this.state.selectedReminderId;

        if (selectedReminderId) {
            this.setState({selectedReminderId: undefined});            
            this.props.history.push(`/reminder/${selectedReminderId}`);
        }        
    }



    handleDelete() {
        const selectedReminderId = this.state.selectedReminderId;

        if (selectedReminderId) {
            this.setState({selectedReminderId: undefined});                        
            this.props.action.deleteReminderAction(selectedReminderId)
                .catch(error => {
                    toastr.error(error);
                });
        }
    }



    handleRowSelect(row, isSelected) {
        if (isSelected) {
            this.setState({selectedReminderId: row.id});
        }
    }



    render() {
        const { reminders } = this.props;

        if (!reminders) {
            return (
                <div>Loading...</div>
            );
        }

        return (
            <div className="container-fluid">
                <div className="row mt-3">
                    <div className="col">
                        <h1>Reminders</h1>                        
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col">
                        <div className="btn-group" role="group">
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={this.handleAddReminder}
                            >
                                <i className="fa fa-plus" aria-hidden="true"/> New
                            </button>

                            <button
                                type="button"
                                className="btn btn-warning ml-2"
                                onClick={this.handleEditReminder}                                
                            >
                                <i className="fa fa-pencil" aria-hidden="true"/> Edit
                            </button>                                

                            <button
                                type="button"
                                className="btn btn-danger ml-2"
                                onClick={this.handleDelete}
                            >
                                <i className="fa fa-trash-o" aria-hidden="true" onClick={this.handleDelete}/> Delete
                            </button>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <ReminderList reminders={reminders} handleRowSelect={this.handleRowSelect}/>
                    </div>
                </div>
            </div>
        );
    }
}



const mapStateToProps = state => ({
    reminders: state.remindersReducer.reminders
});



const mapDispatchToProps = dispatch => ({
    action: bindActionCreators(reminderAction, dispatch)

});



export default connect(mapStateToProps, mapDispatchToProps)(ReminderListContainer);
