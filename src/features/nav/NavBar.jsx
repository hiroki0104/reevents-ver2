import React, { useState } from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';
import { NavLink, useHistory } from 'react-router-dom';
import SignedOutMenu from './SignedOutMenu';
import SignedInMenu from './SignedInMenu';

function NavBar({ setFormOpen }) {
  const history = useHistory();
  const [authenicated, setAuthenticated] = useState(false);

  function handleSignOut() {
    setAuthenticated(false);
    history.push('/');
  }

  return (
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item header as={NavLink} to='/' exact>
          <img src='/assets/logo.png' alt='logo' style={{ marginRight: 15 }} />
          Re-events
        </Menu.Item>
        <Menu.Item name='Events' as={NavLink} to='/events' />
        {authenicated && (
          <Menu.Item as={NavLink} to='/createEvent'>
            <Button positive inverted content='Create Event' />
          </Menu.Item>
        )}
        {authenicated ? (
          <SignedInMenu signOut={handleSignOut} />
        ) : (
          <SignedOutMenu setAuthenticated={setAuthenticated} />
        )}
      </Container>
    </Menu>
  );
}

export default NavBar;
