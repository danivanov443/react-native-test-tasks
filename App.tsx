import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  FlexCardScreen,
  HomeScreen,
  ImageCarouselScreen,
  ImageFormScreen,
} from './src/screens';

export type RootStackParamList = {
  Home: undefined;
  FlexCard: undefined;
  ImageCarousel: undefined;
  ImageForm: undefined;
};

const MainStack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <MainStack.Navigator>
        <MainStack.Screen name="Home" component={HomeScreen} />
        <MainStack.Screen name="FlexCard" component={FlexCardScreen} />
        <MainStack.Screen
          name="ImageCarousel"
          component={ImageCarouselScreen}
        />
        <MainStack.Screen name="ImageForm" component={ImageFormScreen} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}

export default App;
