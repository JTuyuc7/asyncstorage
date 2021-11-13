import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, ScrollView, Text, StyleSheet, TextInput, TouchableHighlight, Keyboard } from 'react-native';
//import {AsyncStorage} from '@react-native-community/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {

  const [ texto, guardarTexto ] = useState('');
  const [ valueName, setValueName ] = useState('');
  const [ showText, setShowText ] = useState(false);

  useEffect(() => {
    obtenerData()
    //setShowText(true)
  }, []);

  const obtenerData = async () => {
    try{
      const data = await AsyncStorage.getItem('nombre')
      setValueName(data)
      if( data != null ){
        setShowText(true)
      }

    }catch (error){
      console.log(error, 'Unable to get data')
    }
  }

  const agregarNombre = async () => {
    
    try{
      //const obj = JSON.stringify(texto)
      await AsyncStorage.setItem('nombre', texto );
      Keyboard.dismiss();
      setShowText(true)
      setValueName(texto)
      guardarTexto('')

    } catch (error) {
      console.log('An error ocurred', error)
    }
    
  }

  const eliminarNombre = async () => {
    try {
      await AsyncStorage.removeItem('nombre');
      setShowText(false)
      setValueName('')
    } catch (error) {
      console.log(error, 'Unable to remove Item')
    }
  }

  return (  
    <>
      <SafeAreaView style={ styles.main }>
        <View style={ styles.contentContainer}>

          { showText === false ? null : <Text style={styles.textoName}>Hola: {valueName}</Text>}

          <TextInput
            placeholder="Ingresa tu nombre"
            onChangeText={ (text) => guardarTexto(text)}
            style={ styles.input}
            placeholderTextColor="#FFF"
            value={texto}
          />

          <View >
            <View style={ styles.agregarButton}>
              <TouchableHighlight
                onPress={ () => agregarNombre() }
              >
                <Text style={ styles.textoButton}>Agregar nombre</Text>
              </TouchableHighlight>
            </View>
            { showText && (
              <View style={styles.buttonContainer}>
              <TouchableHighlight
                onPress={ () => eliminarNombre()}
              >
                <Text style={ styles.textoButton}>Eliminar nombre &times;</Text>
              </TouchableHighlight>
            </View>
            )}
          </View>
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
    
  },
  buttonContainer: {
    flexDirection: 'column',
    backgroundColor: 'red',
    marginTop: 20,
    height: 45,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textoButton: {
    textAlign: 'center',
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 19,
    textTransform: 'uppercase'
  },
  agregarButton: {
    marginTop: 20,
    marginBottom: 10
  },
  textoName: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 17,
    fontWeight:'bold',
    marginBottom: 20
  }
})

export default App;