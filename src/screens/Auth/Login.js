// const { View, Text, Image, TextInput, TouchableOpacity, ScrollView, Alert, } = require('react-native');
// import { useNavigation } from '@react-navigation/native';
// import styles from './styles';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import { useState } from 'react';
// import { loginUser, useAuthContext } from '../../context/AuthContext';
// import Toast from 'react-native-toast-message';

// function Login() {
//     const navigation = useNavigation();
//     const { dispatch } = useAuthContext();

//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     const handleSubmit = async () => {

//         await loginUser(email, password, dispatch);
//         AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
//         Toast.show({
//             type: 'success',
//             text2: 'User loggedIn successfully',
//             visibilityTime: 10000,
//         });

//         Alert.alert('Logged In Successfull');

//     };

//     return (
//         <ScrollView
//             contentContainerStyle={{ flexGrow: 1 }}
//             keyboardShouldPersistTaps={'always'}>
//             <View style={{ backgroundColor: 'white' }}>
//                 <View style={styles.logoContainer}>
//                     <Image
//                         style={styles.logo}
//                         source={require('../../assets/Images/mainLogo.png')}
//                     />
//                 </View>
//                 <View style={styles.loginContainer}>
//                     <Text style={styles.text_header}>Login</Text>
//                     <View style={styles.action}>
//                         <FontAwesome
//                             name="user-o"
//                             color="#420475"
//                             style={styles.smallIcon}
//                         />
//                         <TextInput
//                             placeholder="Mobile or Email"
//                             placeholderTextColor="#000"
//                             style={styles.textInput}
//                             onChange={e => setEmail(e.nativeEvent.text)}
//                         />
//                     </View>
//                     <View style={styles.action}>
//                         <FontAwesome name="lock" color="#420475" style={styles.smallIcon} />
//                         <TextInput
//                             placeholder="Password"
//                             placeholderTextColor="#000"
//                             style={styles.textInput}
//                             onChange={e => setPassword(e.nativeEvent.text)}
//                         />
//                     </View>
//                     <View
//                         style={{
//                             justifyContent: 'flex-end',
//                             alignItems: 'flex-end',
//                             marginTop: 8,
//                             marginRight: 10,
//                         }}>
//                         <Text style={{ color: '#420475', fontWeight: '700' }}>
//                             Forgot Password
//                         </Text>
//                     </View>
//                 </View>
//                 <View style={styles.button}>
//                     <TouchableOpacity style={styles.inBut} onPress={() => handleSubmit()}>
//                         <View>
//                             <Text style={styles.textSign}>Log in</Text>
//                         </View>
//                     </TouchableOpacity>

//                     <View style={{ padding: 15 }}>
//                         <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#919191' }}>
//                             ----Or Continue as----
//                         </Text>
//                     </View>
//                     <View
//                         style={{
//                             flex: 1, // Take full screen space
//                             justifyContent: 'center', // Center vertically
//                             alignItems: 'center', // Center horizontally
//                         }}
//                     >
//                         <View
//                             style={{
//                                 flexDirection: 'row', // Place items on the same line
//                                 justifyContent: 'center', // Center items horizontally
//                                 alignItems: 'center', // Align items vertically in the center
//                             }}
//                         >
//                             <View
//                                 style={{
//                                     alignItems: 'center',
//                                     justifyContent: 'center',
//                                     marginRight: 20, // Add spacing between the buttons if needed
//                                 }}
//                             >
//                                 <TouchableOpacity style={styles.inBut2}>
//                                     <FontAwesome
//                                         name="user-circle-o"
//                                         color="white"
//                                         style={styles.smallIcon2}
//                                     />
//                                 </TouchableOpacity>
//                                 <Text style={styles.bottomText}>Guest</Text>
//                             </View>

//                             <View
//                                 style={{
//                                     alignItems: 'center',
//                                     justifyContent: 'center',
//                                 }}
//                             >
//                                 <TouchableOpacity
//                                     style={styles.inBut2}
//                                     onPress={() => {
//                                         navigation.navigate('Register');
//                                     }}
//                                 >
//                                     <FontAwesome
//                                         name="user-plus"
//                                         color="white"
//                                         style={[styles.smallIcon2, { fontSize: 30 }]}
//                                     />
//                                 </TouchableOpacity>
//                                 <Text style={styles.bottomText}>Sign Up</Text>
//                             </View>
//                         </View>
//                     </View>

//                 </View>
//             </View>
//         </ScrollView>
//     );
// }
// export default Login;



import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { loginUser, useAuthContext } from '../../context/AuthContext';
import Toast from 'react-native-toast-message';
import styles from './styles';

function Login() {
    const navigation = useNavigation(); // Navigation hook
    const { dispatch } = useAuthContext();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {
        // Pass navigation to loginUser function
        await loginUser(email, password, dispatch, navigation);
        AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
        Toast.show({
            type: 'success',
            text2: 'User loggedIn successfully',
            visibilityTime: 10000,
        });

        Alert.alert('Logged In Successfully');
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps={'always'}>
            <View style={{ backgroundColor: 'white' }}>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={require('../../assets/Images/mainLogo.png')} />
                </View>
                <View style={styles.loginContainer}>
                    <Text style={styles.text_header}>Login</Text>
                    <View style={styles.action}>
                        <FontAwesome name="user-o" color="#420475" style={styles.smallIcon} />
                        <TextInput
                            placeholder="Mobile or Email"
                            placeholderTextColor="#000"
                            style={styles.textInput}
                            onChange={e => setEmail(e.nativeEvent.text)}
                        />
                    </View>
                    <View style={styles.action}>
                        <FontAwesome name="lock" color="#420475" style={styles.smallIcon} />
                        <TextInput
                            placeholder="Password"
                            placeholderTextColor="#000"
                            style={styles.textInput}
                            onChange={e => setPassword(e.nativeEvent.text)}
                        />
                    </View>
                    <View
                        style={{
                            justifyContent: 'flex-end',
                            alignItems: 'flex-end',
                            marginTop: 8,
                            marginRight: 10,
                        }}
                    >
                        <Text style={{ color: '#420475', fontWeight: '700' }}>Forgot Password</Text>
                    </View>
                </View>
                <View style={styles.button}>
                    <TouchableOpacity style={styles.inBut} onPress={handleSubmit}>
                        <View>
                            <Text style={styles.textSign}>Log in</Text>
                        </View>
                    </TouchableOpacity>

                    <View style={{ padding: 15 }}>
                        <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#919191' }}>
                            ----Or Continue as----
                        </Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ alignItems: 'center', justifyContent: 'center', marginRight: 20 }}>
                                <TouchableOpacity style={styles.inBut2}>
                                    <FontAwesome name="user-circle-o" color="white" style={styles.smallIcon2} />
                                </TouchableOpacity>
                                <Text style={styles.bottomText}>Guest</Text>
                            </View>

                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <TouchableOpacity
                                    style={styles.inBut2}
                                    onPress={() => {
                                        navigation.navigate('Register');
                                    }}
                                >
                                    <FontAwesome
                                        name="user-plus"
                                        color="white"
                                        style={[styles.smallIcon2, { fontSize: 30 }]}
                                    />
                                </TouchableOpacity>
                                <Text style={styles.bottomText}>Sign Up</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

export default Login;
