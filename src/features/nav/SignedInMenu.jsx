import React from 'react';
import { Menu, Image, Dropdown } from 'semantic-ui-react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { signOutFirebase } from '../../app/firestore/firebaseService';
import { toast } from 'react-toastify';

function SignedInMenu() {
  const { currentUser } = useSelector(({ auth }) => auth);
  const history = useHistory();

  async function handleSignOut() {
    try {
      history.push('/');
      await signOutFirebase();
    } catch (e) {
      toast.error(e.message);
    }
  }
  return (
    <Menu.Item position='right'>
      <Image
        avatar
        spaced='right'
        src={currentUser.photoURL || '/assets/user.png'}
      />
      <Dropdown position='top left' text={currentUser.displayName}>
        <Dropdown.Menu>
          <Dropdown.Item
            as={Link}
            to='/createEvent'
            text='Create Event'
            icon='plus'></Dropdown.Item>
          <Dropdown.Item text='My profile' icon='user'></Dropdown.Item>
          <Dropdown.Item
            text='My account'
            icon='settings'
            as={Link}
            to='/account'></Dropdown.Item>
          <Dropdown.Item
            onClick={handleSignOut}
            text='Sign Out'
            icon='power'></Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
}

export default SignedInMenu;
