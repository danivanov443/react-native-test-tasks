import React, {useCallback, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';

function FlexCardScreen(): React.JSX.Element {
  const [containerWidth, setContainerWidth] = useState(200);
  const [usePercentileWidth, setUsePercentileWidth] = useState(false);

  const handleWidthChange = useCallback(
    (text: string) => {
      if (text) {
        setContainerWidth(Number(text));
      } else {
        setContainerWidth(0);
      }
    },
    [setContainerWidth],
  );

  const cardItems: Array<number> = [150, 150, 200, 200, 100, 100];

  const backgroundStyle = {
    backgroundColor: 'white',
    flex: 1,
  };

  return (
    <ScrollView style={backgroundStyle}>
      <View style={styles.inputWrapper}>
        <Text>{'Использовать ширину 70% от экрана:'}</Text>
        <Switch
          onChange={() => setUsePercentileWidth(prev => !prev)}
          value={usePercentileWidth}
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text>{'Ширина контейнера:'}</Text>
        <TextInput
          onChangeText={handleWidthChange}
          value={containerWidth.toString()}
          inputMode="numeric"
        />
      </View>
      <CardList
        data={cardItems}
        containerWidth={containerWidth}
        usePercentileWidth={usePercentileWidth}
      />
    </ScrollView>
  );
}

type CardListProps = {
  data: Array<number>;
  containerWidth: number;
  usePercentileWidth: boolean;
};

function CardList({
  data,
  containerWidth,
  usePercentileWidth,
}: CardListProps): React.JSX.Element {
  const cardListStyle = [
    styles.cardList,
    {width: usePercentileWidth ? '70%' : containerWidth},
  ];

  return (
    <View style={cardListStyle}>
      {data.map((cardItem, index) => (
        <Card height={cardItem} key={index} />
      ))}
    </View>
  );
}

type CardProps = {
  height: number;
};

function Card({height}: CardProps): React.JSX.Element {
  const cardStyle = [styles.card, {minHeight: height}];
  return (
    <View style={cardStyle}>
      <Text>{height}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexGrow: 1,
    backgroundColor: 'beige',
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  cardList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'aqua',
    margin: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
  },
});

export default FlexCardScreen;
