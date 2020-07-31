import React from 'react';
import { Menu, Image, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

function SignedInMenu({ signOut }) {
  return (
    <Menu.Item position='right'>
      <Image avatar spaced='right' src='/assets/user.png' />
      <Dropdown position='top left' text='Bob'>
        <Dropdown.Menu>
          <Dropdown.Item
            as={Link}
            to='/createEvent'
            text='Create Event'
            icon='plus'></Dropdown.Item>
          <Dropdown.Item text='My profile' icon='user'></Dropdown.Item>
          <Dropdown.Item
            onClick={signOut}
            text='Sign Out'
            icon='power'></Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
}

export default SignedInMenu;
