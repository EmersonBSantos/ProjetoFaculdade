import React, {
  useState,
  useEffect
} from 'react';

import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native';

import {
  collection,
  addDoc,
  updateDoc,
  doc
} from 'firebase/firestore';

import { db } from '../services/firebase';

export default function CadastroScreen({
  navigation,
  route
}) {

  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [bairro, setBairro] = useState('');

  useEffect(() => {

    if (route.params?.item) {

      setTitulo(route.params.item.titulo);
      setDescricao(route.params.item.descricao);
      setBairro(route.params.item.bairro);

    }

  }, []);

  async function salvar() {

    if (route.params?.item) {

      await updateDoc(
        doc(db, 'problemas', route.params.item.id),
        {
          titulo,
          descricao,
          bairro
        }
      );

    } else {

      await addDoc(
        collection(db, 'problemas'),
        {
          titulo,
          descricao,
          bairro
        }
      );

    }
if (navigation.canGoBack()) {
  navigation.goBack();
}
  }

  return (

    <View style={styles.container}>

      <TextInput
        placeholder="Título"
        style={styles.input}
        value={titulo}
        onChangeText={setTitulo}
      />

      <TextInput
        placeholder="Descrição"
        style={styles.input}
        value={descricao}
        onChangeText={setDescricao}
      />

      <TextInput
        placeholder="Bairro"
        style={styles.input}
        value={bairro}
        onChangeText={setBairro}
      />

      <TouchableOpacity
        style={styles.botao}
        onPress={salvar}
      >

        <Text style={styles.botaoTexto}>
          Salvar
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

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15
  },

  botao: {
    backgroundColor: '#32cd3a',
    padding: 15,
    borderRadius: 10
  },

  botaoTexto: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold'
  }

});