
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DialPadUI from './src/screens/Dialpad';
import OutgoingCallUI from './src/screens/Outgoingcall';
import IncomingCallUI from './src/screens/Incomingcall';
import NumberManagementUI from './src/screens/Numbermanagement';
import NumberSettingsUI from './src/screens/NumberSettings';
import { Provider } from 'react-redux';
import store from './src/store';


const Stack = createNativeStackNavigator();

function App() {
  return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="NumberSettingsScreen">
              <Stack.Screen
                  name="DialPadScreen"
                  component={DialPadUI}
              />
              <Stack.Screen
                name='OutgoingCallScreen'
                component={OutgoingCallUI}
              />
              <Stack.Screen
                name='IncomingCallScreen'
                component={IncomingCallUI}
              /> 
              <Stack.Screen
                name='NumberManagementScreen'
                component={NumberManagementUI}
              />
              <Stack.Screen
                name='NumberSettingsScreen'
                component={NumberSettingsUI}
              />
          </Stack.Navigator>
        </NavigationContainer>
    </Provider>
  );
}
export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

