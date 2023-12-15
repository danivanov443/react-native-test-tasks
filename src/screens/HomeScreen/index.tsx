import React from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

function HomeScreen({navigation}: Props): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Button
        onPress={() => navigation.navigate('FlexCard')}
        title={'Task 1 - Flex Card'}
      />
      <Button
        onPress={() => navigation.navigate('ImageCarousel')}
        title={'Task 2 - Image Carousel'}
      />
      <Button
        onPress={() => navigation.navigate('ImageForm')}
        title={'Task 3 - Image Form'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
});

export default HomeScreen;
