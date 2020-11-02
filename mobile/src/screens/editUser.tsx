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
    
    const [valueemail, setvalueEmail] = useState('')
    const [valuename, setvalueName] = useState('')
    const [valueusername, setvalueUsername] = useState('')
    const [valuecity, setvalueCity] = useState('')
    const [valueuf, setvalueUf] = useState('')
    const [valuepassword, setvaluePassword] = useState('')
    const [valueage, setvalueAge] = useState('')
   
    

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
            
        
            <TextInput
                placeholder={user.name}
                placeholderTextColor="#F1DABF"
                style={styles.textinput}
                returnKeyType="next"
                autoFocus={true} blurOnSubmit={false}

                onChangeText={setName}

            />
         
            <TextInput
                placeholder={user.email}
                placeholderTextColor="#F1DABF"
                style={styles.textinput}
                returnKeyType="next"
                autoFocus={true} blurOnSubmit={false}

                
                onChangeText={setEmail}

            />
            <TextInput
                placeholder={user.username}
                placeholderTextColor="#F1DABF"
                style={styles.textinput}
                returnKeyType="next"
                autoFocus={true} blurOnSubmit={false}

                onChangeText={setUsername}

            />
            <TextInput
                placeholder={user.city}
                placeholderTextColor="#F1DABF"
                style={styles.textinput}
                returnKeyType="next"
                autoFocus={true} blurOnSubmit={false}

                onChangeText={setCity}

            />
            <TextInput
                placeholder={user.uf}
                placeholderTextColor="#F1DABF"
                style={styles.textinput}
                returnKeyType="next"
                autoFocus={true} blurOnSubmit={false}

                onChangeText={setUf}

            />
            <TextInput
                placeholder={user.age}
                placeholderTextColor="#F1DABF"
                style={styles.textinput}
                returnKeyType="next"
                autoFocus={true} blurOnSubmit={false}
                keyboardType="numeric"
                onChangeText={setAge}

            />
            <TextInput
                secureTextEntry={true}
                autoCompleteType="password"
                placeholder="Senha"
                placeholderTextColor="#F1DABF"
                style={styles.textinput}

                returnKeyType="next"

                value={valuepassword}
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
        , backgroundColor: "#343330"
    },
    textinput: {
        backgroundColor: '#DC851F', padding: 24,
        borderRadius: 14,
        width: "75%", margin: 10
    }



})



