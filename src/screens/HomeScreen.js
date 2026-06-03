import React, { useEffect, useState, useCallback } from 'react';

import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';

import {
  collection,
  getDocs,
  deleteDoc,
  doc
} from 'firebase/firestore';

import { db } from '../services/firebase';

import {
  useFocusEffect
} from '@react-navigation/native';

export default function HomeScreen({ navigation }) {

  const [dados, setDados] = useState([]);

  async function carregarDados() {

    const querySnapshot = await getDocs(
      collection(db, 'problemas')
    );

    const lista = [];

    querySnapshot.forEach((doc) => {
      lista.push({
        id: doc.id,
        ...doc.data()
      });
    });

    setDados(lista);
  }

  useFocusEffect(
  useCallback(() => {
    carregarDados();
  }, [])
  );

  function confirmarExclusao(id) {

  Alert.alert(
    'Excluir ocorrência',
    'Deseja realmente excluir esta denúncia?',
    [
      {
        text: 'Cancelar',
        style: 'cancel'
      },

      {
        text: 'Excluir',

        onPress: async () => {

          await deleteDoc(
            doc(db, 'problemas', id)
          );

          carregarDados();
        }
      }
    ]
  );
}

  return (
    <View style={styles.container}>
    <Image
  source={require('../../assets/maceio.png')}
  style={styles.imagem}
/>

      <TouchableOpacity
        style={styles.botao}
        onPress={() =>
          navigation.navigate('Cadastro')
        }
      >
        <Text style={styles.botaoTexto}>
          Nova Denúncia
        </Text>
      </TouchableOpacity>

      <FlatList
        data={dados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (

          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate('Detalhes', {
                item
              })
            }
          >

            <Text style={styles.titulo}>
              {item.titulo}
            </Text>

            <Text>
              {item.bairro}
            </Text>

            <View style={styles.areaBotoes}>

  <TouchableOpacity
    style={styles.botaoEditar}
    onPress={() =>
      navigation.navigate('Detalhes', {
        item
      })
    }
  >

    <Text style={styles.textoBotao}>
      ✏️
    </Text>

  </TouchableOpacity>

  <TouchableOpacity
    style={styles.botaoExcluir}
    onPress={() =>
      confirmarExclusao(item.id)
    }
  >

    <Text style={styles.textoBotao}>
      🗑️
    </Text>

  </TouchableOpacity>

</View>

          </TouchableOpacity>

        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20
  },

  botao: {
    backgroundColor: '#6C63FF',
    elevation: 3,
    padding: 15,
    borderRadius: 10,
    marginBottom: 20
    
  },

  botaoTexto: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold'
  },

  card: {
  backgroundColor: '#ffffff',
  padding: 18,
  marginBottom: 15,
  borderRadius: 15,

  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2
  },

  shadowOpacity: 0.1,
  shadowRadius: 4,

  elevation: 3
},

  titulo: {
    fontWeight: 'bold',
    fontSize: 18
  },

  imagem: {
  width: '100%',
  height: 180,
  borderRadius: 15,
  marginBottom: 20
},

  areaBotoes: {
  flexDirection: 'row',
  marginTop: 15
},

  botaoEditar: {
  backgroundColor: '#0984E3',
  padding: 10,
  borderRadius: 8,
  marginRight: 10
},

  botaoExcluir: {
  backgroundColor: '#D63031',
  padding: 10,
  borderRadius: 8
},

  textoBotao: {
  color: '#fff',
  fontWeight: 'bold'
},

});