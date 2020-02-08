import React, { memo } from "react";
import { ActivityIndicator } from "react-native";
import firebase from "firebase/app";
import "firebase/auth";
import Background from "../../Components/Background";
import { Colors } from "../../Themes";
import { FIREBASE_CONFIGX } from '../../Services/Config';
// Initialize Firebase
firebase.initializeApp(FIREBASE_CONFIGX);

const AuthLoadingScreen = ({ navigation }) => {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            // User is logged in
            navigation.navigate("DashboardScreen");
        } else {
            // User is not logged in
            navigation.navigate("OnboardingScreen");
        }
    });

    return (
        <Background>
            <ActivityIndicator size="large" color={Colors.primary} />
        </Background>
    );
};

export default memo(AuthLoadingScreen);
