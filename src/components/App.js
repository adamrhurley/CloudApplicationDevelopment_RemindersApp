import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ReminderListContainer from './reminder/ReminderListContainer'; // eslint-disable-line import/no-named-as-default
import AddOrEditReminderContainer from './reminder/AddOrEditReminderContainer'; // eslint-disable-line import/no-named-as-default

const App = () => {
    return (
        <div >
            <Router>
                <div>

                    <Switch>
                        <Route exact path="/" component={ReminderListContainer} />
                        <Route exact path="/reminder" component={AddOrEditReminderContainer} />
                        <Route path="/reminder/:id" component={AddOrEditReminderContainer} />
                    </Switch>

                </div>

            </Router>
        </div>
    );
};


export default App;