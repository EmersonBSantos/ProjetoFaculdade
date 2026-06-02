import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native';

export default function LoginScreen({
  navigation
}) {

  return (

    <View style={styles.container}>

      <Image
        source={require('../../assets/cidade.png')}
        style={styles.imagem}
      />

      <Text style={styles.titulo}>
        Cidade Limpa
      </Text>

      <Text style={styles.subtitulo}>
        Ajude sua cidade denunciando problemas urbanos
      </Text>

      <TouchableOpacity
        style={styles.botao}
        onPress={() =>
          navigation.navigate('Home')
        }
      >

        <Text style={styles.botaoTexto}>
          Entrar
        </Text>

      </TouchableOpacity>

    </View>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F6FA'
  },

  imagem: {
    width: 220,
    height: 220,
    marginBottom: 20
  },

  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2D3436'
  },

  subtitulo: {
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 30,
    fontSize: 16,
    color: '#636E72'
  },

  botao: {
    backgroundColor: '#6C63FF',
    padding: 15,
    width: '100%',
    borderRadius: 10
  },

  botaoTexto: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold'
  }

});