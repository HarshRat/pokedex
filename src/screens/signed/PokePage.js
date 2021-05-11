import React from 'react';
import {
  View,
  Dimensions,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const win = Dimensions.get('window');

const PokePage = ({route, navigation}) => {
  const {name, pokemon, url} = route.params;

  const [isFavorite, setIsFavorite] = React.useState(false);
  const [full, setFull] = React.useState(false);

  React.useEffect(() => {
    // console.log(auth().currentUser);
    firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .collection('Favorites')
      .doc(pokemon.id.toString())
      .get()
      .then((response) => {
        if (response.exists && response.data().isFav) {
          setIsFavorite(true);
        } else {
          setIsFavorite(false);
          firestore()
            .collection('users')
            .doc(auth().currentUser.uid)
            .collection('Favorites')
            .where('isFav', 'in', [true])
            .get()
            .then((resp) => {
              if (resp.docs.length === 6) {
                setFull(true);
              }
            });
        }
      })
      .catch((e) => console.log(e));
  }, [isFavorite, pokemon.id]);

  React.useEffect(() => {}, []);

  function party() {
    if (!isFavorite) {
      firestore()
        .collection('users')
        .doc(auth().currentUser.uid)
        .collection('Favorites')
        .where('isFav', 'in', [true])
        .get()
        .then((resp) => {
          if (resp.docs.length !== 6) {
            firestore()
              .collection('users')
              .doc(auth().currentUser.uid)
              .collection('Favorites')
              .doc(pokemon.id.toString())
              .set({isFav: true, name: name, url: url});
            setIsFavorite(true);
          } else {
            Alert.alert(
              'Party full!',
              'Remove other pokemon from party to add new one!',
            );
          }
        });
    } else {
      firestore()
        .collection('users')
        .doc(auth().currentUser.uid)
        .collection('Favorites')
        .doc(pokemon.id.toString())
        .update({isFav: false});
      setIsFavorite(false);
    }
  }

  return (
    <ScrollView>
      <View style={styles.card}>
        <Image
          source={{
            uri: pokemon.sprites.other['official-artwork'].front_default,
          }}
          style={styles.pokemonImage}
        />
        <Text style={styles.pokemonName}>
          #{pokemon.id} {name}
        </Text>
        <Text style={styles.type}>
          {pokemon.types.map((poke, i) => (
            <Text key={i}>
              {'   '}
              {poke.type.name}
              {'   '}
            </Text>
          ))}
        </Text>
        <View style={styles.pokemonDetails}>
          <Text style={styles.stat}>HP: {pokemon.stats[0].base_stat}</Text>
          <Text style={styles.statr}>
            Sp. Attack: {pokemon.stats[3].base_stat}
          </Text>
          <Text style={styles.stat}>Attack: {pokemon.stats[1].base_stat}</Text>
          <Text style={styles.statr}>
            Sp. Defence: {pokemon.stats[4].base_stat}
          </Text>
          <Text style={styles.stat}>Defence: {pokemon.stats[2].base_stat}</Text>
          <Text style={styles.statr}>Speed: {pokemon.stats[5].base_stat}</Text>
        </View>
        <View style={styles.pokedexDetails}>
          <Text style={styles.pokedex}>Pokedex:</Text>
          <Text style={styles.stat}>Weight: {pokemon.weight / 10}kgs</Text>
          <Text style={styles.stat}>Height: {pokemon.height / 10}m</Text>
        </View>
      </View>
      {full && !isFavorite && (
        <View style={styles.button}>
          <Text style={styles.buttonText}>Party is full!</Text>
        </View>
      )}
      {!isFavorite && !full && (
        <TouchableOpacity onPress={party} style={styles.button2}>
          <Text style={styles.buttonText2}>Add To Party</Text>
        </TouchableOpacity>
      )}
      {isFavorite && (
        <TouchableOpacity onPress={party} style={styles.button}>
          <Text style={styles.buttonText}>Remove From Party</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  pokemonName: {
    textTransform: 'capitalize',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#ee1515',
    paddingTop: 8,
    paddingLeft: 0,
    paddingBottom: 11,
    width: 200,
    textAlign: 'center',
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 15,
    elevation: 4,
  },
  buttonText: {
    textAlign: 'center',
    color: '#f0f0f0',
  },
  button2: {
    backgroundColor: 'white',
    borderColor: '#ee1515',
    paddingTop: 8,
    paddingBottom: 11,
    paddingLeft: 0,
    width: 200,
    alignSelf: 'center',
    marginBottom: 15,
    borderWidth: 1,
    textAlign: 'center',
    borderRadius: 10,
    elevation: 4,
  },
  buttonText2: {
    textAlign: 'center',
    color: '#ee1515',
  },
  type: {
    marginBottom: 15,
    textTransform: 'capitalize',
    fontSize: 18,
  },
  pokemonImage: {
    width: '100%',
    height: win.width / 1.2,
  },
  card: {
    margin: 30,
    borderWidth: 0,
    borderRadius: 15,
    backgroundColor: 'white',
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pokemonDetails: {
    flex: 1,
    marginHorizontal: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  pokedexDetails: {
    alignSelf: 'flex-start',
    marginHorizontal: 20,
    marginBottom: 15,
  },
  stat: {
    width: '50%',
    fontSize: 17,
  },
  statr: {
    width: '50%',
    fontSize: 17,
    fontWeight: '900',
    textAlign: 'right',
  },
  pokedex: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export {PokePage};
