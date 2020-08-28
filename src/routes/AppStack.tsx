import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
//          react-router
import { createStackNavigator } from '@react-navigation/stack';

import Landing from '../pages/Landing'
import GiveClasses from '../pages/GiveClasses'
import TeacherList from '../pages/TeacherList';
import StudyTabs from './StudyTabs';


const { Navigator, Screen } = createStackNavigator();

function AppStack() {
    return(
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false }}>
                <Screen name="Landing" component={Landing} />
                <Screen name="GiveClasses" component={GiveClasses} />
                <Screen name="TeacherList" component={StudyTabs} />
            </Navigator>
        </NavigationContainer>
    )

}

export default AppStack;