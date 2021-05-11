import React from 'react';
import {ScrollView, View, StyleSheet, Text, Image} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {Card} from '../../components/Card';

const Party = ({navigation}) => {
  const [pokemon, setPokemon] = React.useState(null);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      firestore()
        .collection('users')
        .doc(auth().currentUser.uid)
        .collection('Favorites')
        .where('isFav', 'in', [true])
        .get()
        .then((json) => {
          setPokemon(json);
        })
        .catch((error) => console.log(error));
    });
    return unsubscribe;
  }, [navigation]);

  React.useEffect(() => {
    firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .collection('Favorites')
      .where('isFav', 'in', [true])
      .get()
      .then((json) => {
        setPokemon(json);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <ScrollView>
      {pokemon && pokemon.docs.length === 0 && (
        <View style={styles.empty}>
          <Text style={styles.heading}>You are lonely :(</Text>
          <Image source={require('../../images/sadpika.png')} />
          <Text style={styles.heading}>Add pokemon to your party!</Text>
        </View>
      )}
      <View style={styles.cardsContainer}>
        {pokemon &&
          pokemon.docs.map((poke, i) => <Card pokemon={poke.data()} key={i} />)}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cardsContainer: {
    flex: 1,
    marginHorizontal: '1%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  heading: {
    textAlign: 'center',
    fontSize: 20,
    marginTop: 30,
  },
  empty: {
    alignContent: 'center',
    alignItems: 'center',
  },
});

export {Party};
