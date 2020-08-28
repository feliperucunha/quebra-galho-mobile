import React, { useState } from 'react';
import { View, ScrollView, Text, TextInput } from 'react-native';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import { Feather } from '@expo/vector-icons'

import styles from './styles';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import api from '../../services/api';
//asyncstorage salva apenas dados de texto
import AsyncStorage from '@react-native-community/async-storage'
import { useFocusEffect } from '@react-navigation/native';


function TeacherList() {
    const [areFiltersVisible, setAreFiltersVisible] = useState(false);
    const [teachers, setTeachers] = useState([]);
    const [favorites, Setfavorites] = useState<number[]>([]);

    //GRABBING FILTER DATA TO PARSE TO THE API
    const [subject, setSubject] = useState('');
    const [time, setTime] = useState('');
    const [week_day, setWeek_day] = useState('');

    function loadFavorites() {
        AsyncStorage.getItem('favorites').then(response => {
            if (response) {
                const favoritedTeachers = JSON.parse(response);
                const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
                    return teacher.id;
                })
                Setfavorites(favoritedTeachersIds);
            }
        })
    }

    useFocusEffect(() => {
        loadFavorites();
    })

    function handleVisibleFiltersToggle() {
        setAreFiltersVisible(!areFiltersVisible);
    }

    async function handleSubmitFilters() {
        loadFavorites();

        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time
            }
        });
        setAreFiltersVisible(false);
        setTeachers(response.data);
    }
    

    return (
        <View style={styles.container}>
            <PageHeader
                title="Proffys disponíveis" 
                headerRight={(
                    <BorderlessButton onPress={handleVisibleFiltersToggle}>
                        <Feather name="filter" size={20} color="#FFF" />
                    </BorderlessButton>
                )} >
                { areFiltersVisible && (
                    <View style={styles.searchForm}>
                        <Text style={styles.label}>Matéria</Text>
                        <TextInput 
                            style={styles.input} 
                            placeholder="Qual a matéria?" 
                            placeholderTextColor= '#c1bccc'
                            // ENVIAR DADOS À API
                            value={subject}
                            onChangeText={text => setSubject(text)}
                        />

                        <View style={styles.inputGroup}>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Dia da semana</Text>
                                <TextInput 
                                    style={styles.input} 
                                    placeholder="Qual o dia?" 
                                    placeholderTextColor= '#c1bccc'
                                    // ENVIAR DADOS À API
                                    value={week_day}
                                    onChangeText={text => setWeek_day(text)}
                                />
                            </View>

                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Horário</Text>
                                <TextInput 
                                    style={styles.input} 
                                    placeholder="Qual o horário?" 
                                    placeholderTextColor= '#c1bccc'
                                    // ENVIAR DADOS À API
                                    value={time}
                                    onChangeText={text => setTime(text)}
                                />
                            </View>
                        </View>

                        <RectButton onPress={handleSubmitFilters} style={styles.submitButton}>
                            <Text style={styles.submitButtonText}>Filtrar</Text>
                        </RectButton>
                    </View>
                )}

            </PageHeader>
            
            <ScrollView
                style={styles.teacherList}  
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16,
                }}  
            >
                {teachers.map((teacher: Teacher) => (
                    <TeacherItem 
                        key={teacher.id} 
                        teacher={teacher}
                        favorited={favorites.includes(teacher.id)}
                    />
                ))}
            </ScrollView>
        </View>
    );
}

export default TeacherList;