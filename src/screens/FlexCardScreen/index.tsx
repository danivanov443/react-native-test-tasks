import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

function FlexCardScreen(): React.JSX.Element {
  const cardItems: Array<number> = [150, 150, 200, 200, 100, 100];

  const backgroundStyle = {
    backgroundColor: 'white',
    flex: 1,
  };

  return (
    <View style={backgroundStyle}>
      <CardList data={cardItems} />
    </View>
  );
}

type CardListProps = {
  data: Array<number>;
};

function CardList({data}: CardListProps): React.JSX.Element {
  return (
    <View style={styles.cardList}>
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
    padding: 20,
  },
  cardList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '90%', // карточки адаптируются под любую ширину контейнера
    backgroundColor: 'aqua',
  },
});

export default FlexCardScreen;
