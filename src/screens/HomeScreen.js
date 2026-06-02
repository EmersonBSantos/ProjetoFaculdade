import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import {
  collection,
  getDocs
} from 'firebase/firestore';

import { db } from '../services/firebase';

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

  useEffect(() => {
    carregarDados();
  }, []);

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
    backgroundColor: '#63c1ff',
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
    backgroundColor: '#f1f1f1',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10
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

});