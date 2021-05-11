import React from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Alert,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Formik} from 'formik';
import {useNavigation} from '@react-navigation/native';

const TopBar = () => {
  const navigation = useNavigation();

  return (
    <KeyboardAvoidingView>
      <Formik
        initialValues={{name: ''}}
        onSubmit={(values) => {
          if (values.name) {
            let q =
              'https://pokeapi.co/api/v2/pokemon/' + values.name.toLowerCase();
            fetch(q)
              .then((response) => response.json())
              .then((json) => {
                console.log(json.name);
                navigation.navigate('PokePage', {
                  name: json.name,
                  pokemon: json,
                  url: q,
                });
              })
              .catch((e) => {
                console.log(e);
                Alert.alert('Pokemon not found', 'Enter valid pokemon name');
              });
          }
        }}>
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <View style={styles.outView}>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
              autoCompleteType={null}
              autoCorrect={true}
              placeholder={'Enter Pokemon Name or Id'}
            />
            <View style={styles.flex}>
              <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Search Pokemon</Text>
              </TouchableOpacity>
              <View>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Party')}
                  style={styles.button2}>
                  <Text style={styles.buttonText2}>View Party</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
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
    backgroundColor: 'white',
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
  outView: {
    padding: 25,
  },
  input: {
    borderColor: 'black',
    borderWidth: 0.5,
    borderRadius: 10,
    paddingLeft: 20,
    marginBottom: 15,
    backgroundColor: 'white',
  },
  flex: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export {TopBar};
