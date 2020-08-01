import React from 'react';
import { Menu, Image, Dropdown } from 'semantic-ui-react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOutUser } from '../auth/authAction';

function SignedInMenu() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(({ auth }) => auth);
  const history = useHistory();
  return (
    <Menu.Item position='right'>
      <Image
        avatar
        spaced='right'
        src={currentUser.photoURL || '/assets/user.png'}
      />
      <Dropdown position='top left' text={currentUser.email}>
        <Dropdown.Menu>
          <Dropdown.Item
            as={Link}
            to='/createEvent'
            text='Create Event'
            icon='plus'></Dropdown.Item>
          <Dropdown.Item text='My profile' icon='user'></Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              dispatch(signOutUser());
              history.push('/');
            }}
            text='Sign Out'
            icon='power'></Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
}

export default SignedInMenu;
