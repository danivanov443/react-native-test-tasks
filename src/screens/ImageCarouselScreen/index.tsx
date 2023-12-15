import React, {useState, useRef} from 'react';
import {
  View,
  Image,
  Text,
  Dimensions,
  StyleSheet,
  FlatList,
} from 'react-native';

const images: string[] = [
  'https://www.gstatic.com/webp/gallery3/1.sm.png',
  'https://www.gstatic.com/webp/gallery3/2.sm.png',
  'https://www.gstatic.com/webp/gallery3/3.sm.png',
];

const ImageCarouselScreen = (): React.JSX.Element => {
  return (
    <View style={{flex: 1}}>
      <Carousel images={images} />
    </View>
  );
};

interface CarouselProps {
  images: Array<string>;
}

const Carousel = ({images}: CarouselProps): React.JSX.Element => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const flatListRef = useRef<FlatList<string>>(null);

  const {width: screenWidth} = Dimensions.get('window');
  const totalImages = images.length;

  const handleMomentumScrollEnd = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
    if (index === 0) {
      flatListRef.current?.scrollToIndex({
        index: totalImages,
        animated: false,
      });
      setCurrentIndex(totalImages);
    } else if (index === totalImages + 1) {
      flatListRef.current?.scrollToIndex({
        index: 1,
        animated: false,
      });
      setCurrentIndex(1);
    } else {
      setCurrentIndex(index);
    }
  };

  const adjustedImages = [images[images.length - 1], ...images, images[0]];

  const renderItem = ({item}: {item: string}) => (
    <Image source={{uri: item}} style={{width: screenWidth, height: 200}} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        horizontal
        pagingEnabled
        data={adjustedImages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        getItemLayout={(_, index) => ({
          length: screenWidth,
          offset: screenWidth * index,
          index,
        })}
        initialScrollIndex={1}
      />
      <Text style={styles.indexText}>{`${currentIndex}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  indexText: {
    marginTop: 10,
    fontSize: 18,
  },
});

export default ImageCarouselScreen;
