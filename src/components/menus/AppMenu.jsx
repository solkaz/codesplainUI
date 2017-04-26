import React, { PropTypes } from 'react';
import cookie from 'react-cookie';

import {
  Avatar,
  IconButton,
  IconMenu,
  MenuItem,
} from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import SnippetList from './SnippetList';
import CustomPropTypes from '../../util/custom-prop-types';

const styles = {
  avatar: {
    marginBottom: '1rem',
    marginRight: '1rem',
  },
};

// Returns an <Avatar /> of the user's GitHub icon if the requisite cookie is
// present, otherwise returns null.
const makeAppMenuIcon = () => {
  const avatarURL = cookie.load('userAvatarURL');
  if (avatarURL) {
    return (
      <Avatar
        size={30}
        src={avatarURL}
        style={styles.avatar}
      />
    );
  }
  return <MoreVertIcon color="white" />;
};

/*
<AppMenu /> renders as a white vertical ellipse ⋮ . When clicked it expands to
display a "Sign out" option, that when clicked invokes the 'onSignOut' prop.
*/
const AppMenu = ({ onSignOut, snippetTitles, onTitleClicked }) => (
  <div>
    <IconMenu
      iconButtonElement={<IconButton>{makeAppMenuIcon()}</IconButton>}
      targetOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
    >
      <SnippetList
        onClick={onTitleClicked}
        titles={snippetTitles}
      />
      <MenuItem
        onClick={onSignOut}
        primaryText="Sign out"
      />
    </IconMenu>
  </div>
);

AppMenu.propTypes = {
  onSignOut: PropTypes.func.isRequired,
  onTitleClicked: PropTypes.func.isRequired,
  snippetTitles: CustomPropTypes.snippets.isRequired,
};

export default AppMenu;
