// In App.js in a new project

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput } from 'react-native';
import { NavigationContainer, useFocusEffect, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { FlatList } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons'

import api from '../../services/api';
import { SafeAreaView } from 'react-native-safe-area-context';




export default function createUser() {
    const navigation = useNavigation()
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [city, setCity] = useState('')
    const [uf, setUf] = useState('')
    const [password, setPassword] = useState('')
    const [age, setAge] = useState('')

    const { navigate } = useNavigation()

    async function handleCreateUser() {
        const data ={ 
            email: email,
            name: name,
            username: username,
            city: city,
            password: password,
            uf: uf,
            age: age,
        }

        api.post('users', data)
            .then(() => {
                console.log('[Axios.post] Tentando registrar...')
                Alert.alert('Sucesso', 'Cadastro realizado com sucesso', [{ text: 'Voltar', onPress: ( ) => navigation.navigate('Home') }])
            })
            .catch(({response}) => {
                const { message, erros } = response

                if(!message) {
                    console.log(response)
                    return Alert.alert('Erro', 'Falha ao cadastrar usuario.')
                }

                console.error(message)
                Alert.alert('Erro', message)
            })
    }




    return (
        <SafeAreaView>
        <KeyboardAwareScrollView>
            <View style={styles.container}>
                <TextInput
                    placeholder="Name"
                    placeholderTextColor="#45462A"
                    style={styles.textinput}
                    returnKeyType="next"
                    autoFocus={true} blurOnSubmit={false}

                    value={name}
                    onChangeText ={setName}
                />
                <TextInput
                    placeholder="exemplo.exemplo@gmail.com"
                    placeholderTextColor="#45462A"
                    style={styles.textinput}
                    returnKeyType="next"
                    autoFocus={true} blurOnSubmit={false}

                    value={email}
                    onChangeText={setEmail}

                />
                <TextInput
                    placeholder="@nome_de_usuario"
                    placeholderTextColor="#45462A"
                    style={styles.textinput}
                    returnKeyType="next"
                    autoFocus={true} blurOnSubmit={false}

                    value={username}
                    onChangeText={setUsername}

                />
                <TextInput
                    placeholder="Cidade"
                    placeholderTextColor="#45462A"
                    style={styles.textinput}
                    returnKeyType="next"
                    autoFocus={true} blurOnSubmit={false}

                    value={city}
                    onChangeText={setCity}

                />
                <TextInput
                    placeholder="UF"
                    placeholderTextColor="#45462A"
                    style={styles.textinput}
                    returnKeyType="next"
                    autoFocus={true} blurOnSubmit={false}

                    value={uf}
                    onChangeText={setUf}

                />
                <TextInput
                    placeholder="Idade"
                    placeholderTextColor="#45462A"
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
                    placeholderTextColor="#45462A"
                    style={styles.textinput}

                    returnKeyType="next"

                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity 
                style={styles.button}
                onPress={() => handleCreateUser()}
                >
                    <Text>Finalizar</Text>
                </TouchableOpacity>




            </View>
        </KeyboardAwareScrollView>
        </SafeAreaView>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1, alignItems: 'center', justifyContent: 'center'
        , backgroundColor: "#45462A"
    },
    textinput: {
        backgroundColor: '#FFF', padding: 24,
        borderRadius: 14,
        width: "75%", margin: 10
    },
    button: {
        padding: 24, alignItems: 'center', justifyContent: 'center',
        backgroundColor: '#DC851F', borderRadius: 12
    }



})



