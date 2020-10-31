// In App.js in a new project

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useFocusEffect, useNavigation, } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons'
import {
    useFonts,
    Montserrat_100Thin,
} from '@expo-google-fonts/montserrat';

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

    export default () => {
        let [fontsLoaded] = useFonts({
            Inter_900Black,
        });

        if (!fontsLoaded) {
            return <AppLoading />;
        } else {
            return (
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => navigation.navigate('createEmail_Name')} style={{ flexDirection: 'row', backgroundColor: '#FFF', padding: 14, borderRadius: 14 }}>
                        <Text>Criar usuario </Text>
                        <Feather name="plus-circle" size={14} color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Feather name="refresh-cw" size={60} color="#000" onPress={() => loadUsers()} />
                    </TouchableOpacity>

                    <FlatList
                        data={users}
                        keyExtractor={user => String(user.id)}
                        renderItem={({ item: user }) => (
                            <View style={styles.card}>
                                <View style={styles.header}>
                                    <TouchableOpacity style={styles.icons} onPress={() => deleteUser(user.id)}>
                                        <Feather name="trash-2" size={24} color="#000" />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.icons}
                                        onPress={() => {
                                            navigateToEdit(user)
                                        }}
                                    >
                                        <Feather name="edit" size={24} color="#000" />
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
    }



    const styles = StyleSheet.create({
        container: {
            flex: 1, alignItems: 'center', justifyContent: 'center'
        },
        name: {
            fontSize: 24,
            fontFamily: "Montserrat_100Thin"
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
        }
    })



