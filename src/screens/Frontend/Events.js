import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';

export default function Events({ route }) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const isFocused = useIsFocused();

    // Fetch events from the API
    const fetchItems = async () => {
        try {
            const response = await axios.get("http://172.16.50.49:5003/get-items");
            if (response.data.status === 'ok') {
                setItems(response.data.items);
            } else {
                Alert.alert('Error', response.data.message || 'Failed to fetch events');
            }
        } catch (err) {
            console.error("Error fetching events:", err);
            setError('Failed to connect to server. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isFocused || (route.params && route.params.refresh)) {
            setLoading(true);
            fetchItems();
        }
    }, [isFocused, route.params]);

    // Loading state
    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#6a5acd" />
            </View>
        );
    }

    // Error state
    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    // Display items
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Upcoming Events</Text>
            <FlatList
                data={items}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Text style={styles.itemTitle}>{item.title}</Text>
                        <Text style={styles.itemDate}>Date: {new Date(item.date).toLocaleDateString()}</Text>
                        <Text style={styles.itemDescription}>{item.description}</Text>
                        <Text style={styles.itemLocation}>Location: {item.location}</Text>
                        <Text style={styles.itemCategory}>Category: {item.category}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#e6f7ff',
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 20,
        color: '#2f4f4f',
        textAlign: 'center',
    },
    itemContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 16,
        padding: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        elevation: 5, // Shadow for Android
        shadowColor: '#000', // Shadow for iOS
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    itemTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    itemDate: {
        fontSize: 16,
        color: '#6a5acd',
        marginBottom: 8,
    },
    itemDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
        lineHeight: 20,
    },
    itemLocation: {
        fontSize: 14,
        color: '#555',
        marginBottom: 4,
    },
    itemCategory: {
        fontSize: 14,
        color: '#555',
        marginBottom: 4,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e6f7ff',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8d7da',
    },
    errorText: {
        fontSize: 16,
        color: '#721c24',
    },
});