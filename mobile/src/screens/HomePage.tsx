// In App.js in a new project

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useFocusEffect, useNavigation, } from '@react-navigation/native';
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

export default function HomePage() {
    useFocusEffect(
        React.useCallback(() => {
            loadUsers()
        }, [])
    )

    const navigation = useNavigation()
    const [users, setUsers] = useState<User[]>([])

    async function loadUsers() {
        const response = await api.get('users')

        setUsers(response.data.data)
        console.log(users)
    }

    async function deleteUser(id: number) {
        await api.delete(`users/${id}`)
        .then(() => {
            console.log('[Axios.post] Tentando deletar...')
            Alert.alert('Sucesso', 'Cadastro deletado com sucesso', [{ text: 'Ok', onPress: ( ) => navigation.navigate('Home') }])
        })
        .catch(({response}) => {
            const { message, erros } = response

            if(!message) {
                console.log(response)
                return Alert.alert('Erro', 'Falha ao deletar usuario.')
            }

            console.error(message)
            Alert.alert('Erro', message)
        })
        console.log(id)

        loadUsers()

    }

    useEffect(() => {
        loadUsers()
    }, []);

    function navigateToEdit(user) {
        console.log(user)
        navigation.navigate("editUser", user);
    }

    
            return (
                <View style={styles.container}>
                    <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.navigate('createEmail_Name')} style={styles.icons}>
                        <Feather name="plus-circle" size={24} color="#FFF" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.icons}>
                        <Feather name="refresh-cw" size={24} color="#FFF" onPress={() => loadUsers()} />
                    </TouchableOpacity>

                    </View>

                    <FlatList
                        style={styles.flatlist}
                        data={users}
                        keyExtractor={user => String(user.id)}
                        renderItem={({ item: user }) => (
                            <View style={styles.card}>
                                <View style={styles.header}>
                                    <TouchableOpacity style={styles.icons} onPress={() => deleteUser(user.id)}>
                                        <Feather name="trash-2" size={24} color="#242038" />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.icons}
                                        onPress={() => {
                                            navigateToEdit(user)
                                        }}
                                    >
                                        <Feather name="edit" size={24} color="#242038" />
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.name}>{user.name}</Text>
                                <Text style={styles.username}>@{user.username}</Text>
                                <Text style={styles.about}>Tem {user.age} anos e mora em {user.city} - {user.uf}</Text>
                            </View>
                        )}
                    />

                </View>
            );
        }
    



    const styles = StyleSheet.create({
        container: {
            flex: 1, alignItems: 'center', justifyContent: 'center',
            backgroundColor: '#7E5920', padding: 10
        },
        name: {
            fontSize: 24,
            
        },
        card: {
            backgroundColor: '#fff',
            borderRadius: 12,
            padding: 24,
            paddingHorizontal: 64, marginVertical: 12
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center', justifyContent: 'center'


        },
        icons: {
            marginHorizontal: 10, marginVertical: 10
        },
        username: {
            fontSize: 14,
            color: "gray"
        },
        about: {
            marginTop: 10
        },
        flatlist: {
            backgroundColor: '#DC851F', 
            borderRadius: 24,
            padding: 24
        }
    })



