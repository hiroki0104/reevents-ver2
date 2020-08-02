import React from 'react';
import EventDashboard from '../../features/events/eventDashBoard/EventDashboard';
import NavBar from '../../features/nav/NavBar';
import { Container } from 'semantic-ui-react';
import { Route, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import EventDetailedPage from '../../features/events/eventDetailed/EventDetailedPage';
import EventForm from '../../features/events/eventForm/EventForm';
import Sandbox from '../../features/sandox/Sandbox';
import ModalManager from '../common/modals/ModalManager';
import { ToastContainer } from 'react-toastify';
import ErrorComponent from '../common/errors/ErrorComponent';

function App() {
  const { key } = useLocation();
  return (
    <>
      <ModalManager />
      <ToastContainer position='bottom-right' hideProgressBar />
      <Route path='/' component={HomePage} exact />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <NavBar />
            <Container className='main'>
              <Route path='/events' component={EventDashboard} exact />
              <Route path='/sandbox' component={Sandbox} exact />
              <Route path='/events/:id' component={EventDetailedPage} />
              <Route
                path={['/createEvent', '/manage/:id']}
                component={EventForm}
                key={key}
              />
              <Route path='/error' component={ErrorComponent} />
            </Container>
          </>
        )}
      />
    </>
  );
}

export default App;
