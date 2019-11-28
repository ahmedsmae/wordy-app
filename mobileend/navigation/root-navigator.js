import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import AppWizardScreen from '../screens/app-wizard/app-wizard.component';
import SignInOptionsScreen from '../screens/sign-in-options/sign-in-options.component';
import SignInScreen from '../screens/sign-in/sign-in.component';
import SignUpScreen from '../screens/sign-up/sign-up.component';
import ChatsScreen from '../screens/chats/chats.component';
import ChattingScreenContainer from '../screens/chatting/chatting.container';
import UsersScreen from '../screens/users/users.component';
import SettingsScreen from '../screens/settings/settings.component';
import UserProfileScreen from '../screens/user-profile/user-profile.component';
import EditGroupScreen from '../screens/edit-group/edit-group.component';

import hideHeaderNavOptions from './hide-header-nav-options';

export const createRootNavigator = (currentUser, WizardDisplayed) => {
  const authNavigator = createStackNavigator(
    {
      AppWizard: AppWizardScreen,
      SignInOptions: SignInOptionsScreen,
      SignIn: SignInScreen,
      SignUp: SignUpScreen
    },
    {
      initialRouteName:
        WizardDisplayed === 'DISPLAYED' ? 'SignInOptions' : 'AppWizard',
      ...hideHeaderNavOptions
    }
  );

  const mainNavigator = createStackNavigator(
    {
      Chats: ChatsScreen,
      Chatting: ChattingScreenContainer,
      Users: UsersScreen,
      Settings: SettingsScreen,
      UserProfile: UserProfileScreen,
      EditGroup: EditGroupScreen
    },
    hideHeaderNavOptions
  );

  const switchNavigator = createSwitchNavigator(
    {
      Auth: authNavigator,
      Main: mainNavigator
    },
    {
      initialRouteName: currentUser ? 'Main' : 'Auth',
      ...hideHeaderNavOptions
    }
  );

  return createAppContainer(switchNavigator);
};
