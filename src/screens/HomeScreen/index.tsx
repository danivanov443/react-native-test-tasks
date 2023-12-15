import React, {useCallback} from 'react';
import {Button, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

function HomeScreen({navigation}: Props): React.JSX.Element {
  const backgroundStyle = {
    backgroundColor: 'white',
    flex: 1,
  };

  const navigateToFlexCard = useCallback(
    () => navigation.navigate('FlexCard'),
    [navigation],
  );

  const navigateToImageCarousel = useCallback(
    () => navigation.navigate('ImageCarousel'),
    [navigation],
  );

  const navigateToImageForm = useCallback(
    () => navigation.navigate('ImageForm'),
    [navigation],
  );

  return (
    <View style={backgroundStyle}>
      <Button onPress={navigateToFlexCard} title={'Task 1 - Flex Card'} />
      <Button
        onPress={navigateToImageCarousel}
        title={'Task 2 - Image Carousel'}
      />
      <Button onPress={navigateToImageForm} title={'Task 3 - Image Form'} />
    </View>
  );
}

export default HomeScreen;
