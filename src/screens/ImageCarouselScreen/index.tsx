import React, {useState, useRef} from 'react';
import {
  View,
  Image,
  Text,
  Dimensions,
  StyleSheet,
  ScrollView,
} from 'react-native';

const data: string[] = [
  'https://www.gstatic.com/webp/gallery3/1.sm.png',
  'https://www.gstatic.com/webp/gallery3/2.sm.png',
  'https://www.gstatic.com/webp/gallery3/3.sm.png',
];

const ImageCarouselScreen = (): React.JSX.Element => {
  return (
    <View style={{flex: 1}}>
      <Carousel images={data} />
    </View>
  );
};

interface CarouselProps {
  images: Array<string>;
}

const Carousel = ({images}: CarouselProps): React.JSX.Element => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const scrollViewRef = useRef<ScrollView>(null);

  const {width: screenWidth} = Dimensions.get('window');
  const totalImages = images.length;

  const handleScrollEnd = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / screenWidth);

    if (index === 0) {
      scrollViewRef.current?.scrollTo({
        x: screenWidth * totalImages,
        animated: false,
      });
      setCurrentIndex(totalImages);
    } else if (index === totalImages + 1) {
      scrollViewRef.current?.scrollTo({x: screenWidth, animated: false});
      setCurrentIndex(1);
    } else {
      setCurrentIndex(index);
    }
  };

  const adjustedImages = [images[images.length - 1], ...images, images[0]];

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScrollEnd}
        contentContainerStyle={{width: screenWidth * adjustedImages.length}}
        onContentSizeChange={() => {
          scrollViewRef.current?.scrollTo({x: screenWidth, animated: false});
        }}>
        {adjustedImages.map((item, index) => (
          <Image
            key={index}
            source={{uri: item}}
            style={{width: screenWidth, height: 200}}
            resizeMode={'contain'}
          />
        ))}
      </ScrollView>
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
