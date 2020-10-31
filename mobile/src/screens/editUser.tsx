// In App.js in a new project

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput } from 'react-native';
import { NavigationContainer, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { FlatList } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons'

import api from '../services/api';

interface User {
    id: number,
    email: string,
    name: string,
    username: string,
    city: string,
    uf: string,
    age: number
}



export default function editUser() {
    const navigation = useNavigation()
    const route = useRoute();

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [city, setCity] = useState('')
    const [uf, setUf] = useState('')
    const [password, setPassword] = useState('')
    const [age, setAge] = useState('')
   

    const user = route.params;

    console.log('---------------')
    console.log('[editUser]')
    
    console.log(user)
 

    async function HandleEditUser() {
        const data = {
            email: email,
            name: name,
            username: username,
            city: city,
            password: password,
            uf: uf,
            age: age,
        }
        console.log(`User id: ${user.id}`)

        api.put(`users/${user.id}`, data)
            .then(() => {
                console.log('[Axios.post] Tentando editar dados...')
                Alert.alert('Sucesso', 'Cadastro editado com sucesso', [{ text: 'Voltar', onPress: () => navigation.navigate('Home') }])
            })
            .catch(({ response }) => {
                const { message, erros } = response

                if (!message) {
                    console.log(response)
                    return Alert.alert('Erro', 'Falha ao editar usuario.')
                }

                console.error(message)
                Alert.alert('Erro', message)
            })

    }




return (
    <KeyboardAwareScrollView>
        <View style={styles.container}>
            
            <Text></Text>
            <TextInput
                placeholder={user.name}
                placeholderTextColor="#F1DABF"
                style={styles.textinput}
                returnKeyType="next"
                autoFocus={true} blurOnSubmit={false}

                value={name}
                onChangeText={setName}

            />
            <Text>Seu melhor e-mail</Text>
            <TextInput
                placeholder={email}
                placeholderTextColor="#F1DABF"
                style={styles.textinput}
                returnKeyType="next"
                autoFocus={true} blurOnSubmit={false}

                value={email}
                onChangeText={setEmail}

            />
            <TextInput
                placeholder="@nome_de_usuario"
                placeholderTextColor="#F1DABF"
                style={styles.textinput}
                returnKeyType="next"
                autoFocus={true} blurOnSubmit={false}

                value={username}
                onChangeText={setUsername}

            />
            <TextInput
                placeholder="Cidade"
                placeholderTextColor="#F1DABF"
                style={styles.textinput}
                returnKeyType="next"
                autoFocus={true} blurOnSubmit={false}

                value={city}
                onChangeText={setCity}

            />
            <TextInput
                placeholder="UF"
                placeholderTextColor="#F1DABF"
                style={styles.textinput}
                returnKeyType="next"
                autoFocus={true} blurOnSubmit={false}

                value={uf}
                onChangeText={setUf}

            />
            <TextInput
                placeholder="Idade"
                placeholderTextColor="#F1DABF"
                style={styles.textinput}
                returnKeyType="next"
                autoFocus={true} blurOnSubmit={false}
                keyboardType="numeric"
                value={age}
                onChangeText={setAge}

            />
            <TextInput
                secureTextEntry={true}
                autoCompleteType="password"
                placeholder="Senha"
                placeholderTextColor="#F1DABF"
                style={styles.textinput}

                returnKeyType="next"

                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => HandleEditUser()}
            >
                <Text>Finalizar</Text>
            </TouchableOpacity>




        </View>
    </KeyboardAwareScrollView>
);
}



const styles = StyleSheet.create({
    container: {
        flex: 1, alignItems: 'center', justifyContent: 'center'
    },
    textinput: {
        backgroundColor: '#FFF', padding: 24,
        borderRadius: 14,
        width: "75%", margin: 10
    }



})



