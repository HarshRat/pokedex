import React from 'react';
import {Text, ScrollView, View, StyleSheet, SafeAreaView} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Card} from '../../components/Card';
import {TopBar} from '../../components/TopBar';

const SignedHome = ({navigation}) => {
  const [pokemon, setPokemon] = React.useState(null);
  const [page, setPage] = React.useState(1);
  React.useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon/')
      .then((response) => response.json())
      .then((json) => {
        setPokemon(json);
      });
  }, []);

  const scroll = React.useRef(null);

  function loadMore() {
    let link = pokemon.next;
    fetch(link)
      .then((response) => response.json())
      .then((json) => {
        setPokemon(json);
      })
      .catch((e) => console.log(e));
    setPage(page + 1);
    scroll.current?.scrollTo({
      options: {
        x: 0,
        y: 0,
        animated: true,
      },
    });
  }

  function goBack() {
    let link = pokemon.previous;
    fetch(link)
      .then((response) => response.json())
      .then((json) => {
        setPokemon(json);
      })
      .catch((e) => console.log(e));
    setPage(page - 1);
    scroll.current?.scrollTo({
      options: {
        x: 0,
        y: 0,
        animated: true,
      },
    });
  }

  return (
    <SafeAreaView>
      <ScrollView ref={scroll}>
        <TopBar />
        <View style={styles.cardsContainer}>
          {pokemon &&
            pokemon.results.map((poke, i) => <Card pokemon={poke} key={i} />)}
        </View>
        {page !== 1 && (
          <View style={styles.flex}>
            <TouchableOpacity style={styles.load} onPress={goBack}>
              <Text style={styles.buttonText}>Go Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.load} onPress={loadMore}>
              <Text style={styles.buttonText}>Load More</Text>
            </TouchableOpacity>
          </View>
        )}
        {page === 1 && (
          <View style={styles.flexRev}>
            <TouchableOpacity style={styles.load} onPress={loadMore}>
              <Text style={styles.buttonText}>Load More</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  load: {
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 15,
    backgroundColor: '#ee1515',
    paddingTop: 10,
    paddingLeft: 7,
    paddingBottom: 12,
    width: 140,
    textAlign: 'center',
    borderRadius: 10,
    elevation: 4,
  },
  txt: {
    marginLeft: 12,
    marginBottom: 4,
  },
  cardsContainer: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: '1%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  flex: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flexRev: {
    flex: 1,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#ee1515',
    paddingTop: 10,
    paddingLeft: 7,
    paddingBottom: 12,
    width: 140,
    textAlign: 'center',
    borderRadius: 10,
  },
  button2: {
    backgroundColor: '#f0f0f0',
    borderColor: '#ee1515',
    paddingTop: 8,
    paddingBottom: 11,
    paddingLeft: 0,
    width: 80,
    borderWidth: 1,
    textAlign: 'center',
    borderRadius: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: '#f0f0f0',
  },
  buttonText2: {
    textAlign: 'center',
    color: '#ee1515',
  },
  input: {
    borderColor: 'black',
    borderWidth: 0.5,
    borderRadius: 10,
    paddingLeft: 20,
    marginBottom: 15,
  },
});

export {SignedHome};
