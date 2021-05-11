import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

const win = Dimensions.get('window');

const Card = (props) => {
  const [pokemonDetails, setPokemonDetails] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const navigation = useNavigation();

  React.useEffect(() => {
    setLoading(true);
    fetch(props.pokemon.url)
      .then((response) => response.json())
      .then((json) => {
        setPokemonDetails(json);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }, [props]);

  return (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('PokePage', {
            name: props.pokemon.name,
            pokemon: pokemonDetails,
            url: props.pokemon.url,
          });
        }}>
        {loading && (
          <ActivityIndicator
            animating={true}
            style={styles.indicator}
            size="large"
            color="#000000"
          />
        )}
        {pokemonDetails && !loading && (
          <View>
            <Image
              source={{
                uri:
                  pokemonDetails.sprites.other['official-artwork']
                    .front_default,
              }}
              style={styles.pokemonImage}
            />
            <Text style={styles.pokemonName}>
              #{pokemonDetails.id} {props.pokemon.name}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  pokemonName: {
    textTransform: 'capitalize',
    textAlign: 'center',
    marginBottom: 10,
  },
  pokemonImage: {
    alignSelf: 'center',
    width: '100%',
    height: win.width / 2.2,
  },
  card: {
    margin: 10,
    borderWidth: 0,
    borderRadius: 5,
    width: '44%',
    backgroundColor: 'white',
    elevation: 4,
  },
  indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
  },
});

export {Card};
