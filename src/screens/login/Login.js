import React from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {Formik} from 'formik';
import {TouchableOpacity} from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';

const Login = ({navigation}) => {
  const [isLoading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState(null);
  return (
    <SafeAreaView>
      <KeyboardAvoidingView>
        <ScrollView>
          <Formik
            initialValues={{email: '', password: ''}}
            onSubmit={(values) => {
              setLoading(true);
              console.log(values);
              auth()
                .signInWithEmailAndPassword(values.email, values.password)
                .catch(function (error) {
                  setErrors(error.message);
                  console.log(errors);
                  setLoading(false);
                });
            }}>
            {({handleChange, handleBlur, handleSubmit, values}) => (
              <View style={styles.outView}>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  autoCompleteType={'email'}
                  autoCorrect={false}
                  keyboardType={'email-address'}
                  placeholder={'E-mail'}
                />
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  placeholder={'Password'}
                  textContentType={'password'}
                  autoCorrect={false}
                  secureTextEntry
                />
                <View style={styles.flex}>
                  <TouchableOpacity
                    onPress={handleSubmit}
                    style={styles.button}>
                    <Text style={styles.buttonText}>
                      Log In
                      <ActivityIndicator animating={isLoading} color="white" />
                    </Text>
                  </TouchableOpacity>
                  <View>
                    <Text style={styles.txt}>New here?</Text>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('Signup')}
                      style={styles.button2}>
                      <Text style={styles.buttonText2}>Sign up</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          </Formik>
          {errors && <Text>{errors}</Text>}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  txt: {
    marginLeft: 12,
    marginBottom: 4,
  },
  flex: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#ee1515',
    paddingTop: 3,
    paddingBottom: 11,
    paddingLeft: 20,
    width: 80,
    textAlign: 'center',
    borderRadius: 10,
    marginTop: 17,
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
  outView: {
    padding: 25,
  },
  input: {
    borderColor: 'black',
    borderWidth: 0.5,
    borderRadius: 10,
    paddingLeft: 20,
    marginBottom: 15,
  },
});

export {Login};
