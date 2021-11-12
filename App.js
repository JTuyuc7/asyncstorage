import React, { useState } from 'react';
import { SafeAreaView, View, ScrollView, Text, StyleSheet, TextInput } from 'react-native';

const App = () => {

  const [ info, setInfo ] = useState('');



  return (  
    <>
      <SafeAreaView style={ styles.main }>
        <View style={ styles.contentContainer}>
          <TextInput
            placeholder="Ingresa tu nombre"
            onChangeText={ (text) => setInfo(text)}
            style={ styles.input}
            placeholderTextColor="#FFF"
          />
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'green',
    //alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    //backgroundColor: "#FFF",
    textAlign: 'center',
    color: "#FFF",
    fontWeight: 'bold',
    borderBottomColor: '#FFF',
    borderBottomWidth: 1.5
  },
  contentContainer:{
    paddingHorizontal: 10,
    
  }
})

export default App;