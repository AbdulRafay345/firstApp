import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';

export default function Events({ route }) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const isFocused = useIsFocused();

    const fetchItems = async () => {
        try {
            const response = await axios.get("http://192.168.18.50:5002/get-events");
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

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#e76f51" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Events</Text>
            <FlatList
                data={items}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Text style={styles.itemName}>{item.title}</Text>
                        <Text style={styles.itemDate}>{item.date}</Text>
                        <Text style={styles.itemDescription}>{item.description}</Text>
                        <View style={styles.itemDetails}>
                            <Text style={styles.itemLocation}>Location: {item.location}</Text>
                            <Text style={styles.itemCategory}>Category: {item.category}</Text>
                        </View>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#f8f8f8' },
    title: { fontSize: 28, fontWeight: 'bold', color: '#e76f51', marginBottom: 20, textAlign: 'center' },
    itemContainer: {
        padding: 20,
        marginVertical: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    itemName: { fontSize: 22, fontWeight: 'bold', color: '#333' },
    itemDate: { fontSize: 16, color: '#e76f51', fontStyle: 'italic', marginTop: 4 },
    itemDescription: { fontSize: 16, color: '#555', marginTop: 8 },
    itemDetails: { marginTop: 12 },
    itemLocation: { fontSize: 14, color: '#555' },
    itemCategory: { fontSize: 14, color: '#555' },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    errorText: { color: 'red', fontSize: 16, textAlign: 'center' },
});
