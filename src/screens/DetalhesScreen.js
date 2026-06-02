import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import {
  doc,
  deleteDoc
} from 'firebase/firestore';

import { db } from '../services/firebase';

export default function DetalhesScreen({
  route,
  navigation
}) {

  const { item } = route.params;

  async function excluir() {

    await deleteDoc(
      doc(db, 'problemas', item.id)
    );

    navigation.goBack();
  }

  return (

    <View style={styles.container}>

      <Text style={styles.titulo}>
        {item.titulo}
      </Text>

      <Text style={styles.texto}>
        {item.descricao}
      </Text>

      <Text style={styles.texto}>
        Bairro: {item.bairro}
      </Text>

      <TouchableOpacity
        style={styles.botaoEditar}
        onPress={() =>
          navigation.navigate('Cadastro', {
            item
          })
        }
      >
        <Text style={styles.botaoTexto}>
          Editar
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoExcluir}
        onPress={excluir}
      >
        <Text style={styles.botaoTexto}>
          Excluir
        </Text>
      </TouchableOpacity>

    </View>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20
  },

  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },

  texto: {
    fontSize: 18,
    marginBottom: 10
  },

  botaoEditar: {
    backgroundColor: '#0984E3',
    padding: 15,
    borderRadius: 10,
    marginTop: 20
  },

  botaoExcluir: {
    backgroundColor: '#e30909',
    padding: 15,
    borderRadius: 10,
    marginTop: 20
  },

  botaoTexto: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold'
  }

});