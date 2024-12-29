// import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import Toast from 'react-native-toast-message';

// // Create Auth Context
// const AuthContext = createContext();

// // Initial state for AuthContext
// const initialState = {
//   isAuthenticated: false,
//   user: null,
//   token: null,
// };

// // Reducer function to handle authentication actions
// const reducer = (state, { type, payload }) => {
//   switch (type) {
//     case 'LOGIN':
//       return { ...state, isAuthenticated: true, user: payload.user, token: payload.token };
//     case 'LOGOUT':
//       return { ...state, isAuthenticated: false, user: null, token: null };
//     default:
//       return state;
//   }
// };

// // AuthContextProvider component
// export default function AuthContextProvider({ children }) {
//   const [state, dispatch] = useReducer(reducer, initialState);
//   const [isLoading, setIsLoading] = useState(true); // Loading state

//   // Load user data from AsyncStorage if available
//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const token = await AsyncStorage.getItem('token');
//         const user = await AsyncStorage.getItem('user');
//         if (token && user) {
//           dispatch({
//             type: 'LOGIN',
//             payload: { user: JSON.parse(user), token },
//           });
//         }
//       } catch (error) {
//         console.error('Error loading auth data:', error);
//       } finally {
//         setIsLoading(false); // Stop loading
//       }
//     };
//     loadData();
//   }, []);

//   // Update Axios headers whenever token changes
//   useEffect(() => {
//     if (state.token) {
//       axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;
//     } else {
//       delete axios.defaults.headers.common['Authorization'];
//     }
//   }, [state.token]);

//   if (isLoading) {
//     return null; // Optionally, render a loading spinner here
//   }

//   return (
//     <AuthContext.Provider value={{ ...state, dispatch }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// // Custom hook to use AuthContext
// export const useAuthContext = () => {
//   return useContext(AuthContext);
// };

// // Function to login the user and store user data and token
// export const loginUser = async (email, password, dispatch) => {
//   try {
//     // Send login request to the backend with email and password
//     const response = await axios.post('http://172.16.50.95:5002/login', { email, password });

//     // Check the status in the response to determine whether the login is successful
//     if (response.data.status === 'ok') {
//       const { data: token } = response.data;

//       // Fetch user data from /userdata endpoint
//       const userResponse = await axios.post('http://172.16.50.95:5002/userdata', { token });
//       const userData = userResponse.data.data;

//       // Store token and user data in AsyncStorage
//       await AsyncStorage.setItem('token', token);
//       await AsyncStorage.setItem('user', JSON.stringify(userData));
//       AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));

//       // Dispatch LOGIN action to store user data in context
//       dispatch({
//         type: 'LOGIN',
//         payload: { user: userData, token },
//       });

//       // Show a success message with Toast
//       Toast.show({
//         type: 'success',
//         text2: 'User logged in successfully',
//         visibilityTime: 10000,
//       });

//       // Navigate to the Home screen after successful login
//       navigation.navigate('Home');
//     } else {
//       // Handle invalid credentials
//       Toast.show({
//         type: 'error',
//         text2: 'Invalid credentials. Please try again.',
//         visibilityTime: 10000,
//       });

//     }
//   } catch (error) {
//     console.error('Login error:', error);

//     // Show error toast in case of a server or network error
//     Toast.show({
//       type: 'error',
//       text2: 'An error occurred. Please try again later.',
//       visibilityTime: 10000,
//     });
//   }
// };
// // Logout function
// export const logoutUser = async (dispatch) => {
//   try {
//     console.log('Logging out...');
//     // Remove authentication data from AsyncStorage
//     await AsyncStorage.removeItem('token');
//     await AsyncStorage.removeItem('user');

//     // Reset Axios authorization header
//     delete axios.defaults.headers.common['Authorization'];

//     // Dispatch the LOGOUT action to reset the context state
//     dispatch({ type: 'LOGOUT' });

//     console.log('Logout successful, state reset.');
//   } catch (error) {
//     console.error('Logout error:', error);
//   }
// };



import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Toast from 'react-native-toast-message';

const AuthContext = createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'LOGIN':
      return { ...state, isAuthenticated: true, user: payload.user, token: payload.token };
    case 'LOGOUT':
      return { ...state, isAuthenticated: false, user: null, token: null };
    default:
      return state;
  }
};

export default function AuthContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const user = await AsyncStorage.getItem('user');
        if (token && user) {
          dispatch({
            type: 'LOGIN',
            payload: { user: JSON.parse(user), token },
          });
        }
      } catch (error) {
        console.error('Error loading auth data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (state.token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [state.token]);

  if (isLoading) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  return useContext(AuthContext);
};

// Updated loginUser function to accept navigation
export const loginUser = async (email, password, dispatch, navigation) => {
  try {
    const response = await axios.post('http://192.168.59.140:5002/login', { email, password });

    if (response.data.status === 'ok') {
      const { data: token } = response.data;
      const userResponse = await axios.post('http://192.168.59.140:5002/userdata', { token });
      const userData = userResponse.data.data;

      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));

      dispatch({
        type: 'LOGIN',
        payload: { user: userData, token },
      });

      Toast.show({
        type: 'success',
        text2: 'User logged in successfully',
        visibilityTime: 10000,
      });

      navigation.navigate('Home');
    } else {
      Toast.show({
        type: 'error',
        text2: 'Invalid credentials. Please try again.',
        visibilityTime: 10000,
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    Toast.show({
      type: 'error',
      text2: 'An error occurred. Please try again later.',
      visibilityTime: 10000,
    });
  }
};

export const logoutUser = async (dispatch) => {
  try {
    console.log('Logging out...');
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: 'LOGOUT' });
    console.log('Logout successful, state reset.');
  } catch (error) {
    console.error('Logout error:', error);
  }
};
