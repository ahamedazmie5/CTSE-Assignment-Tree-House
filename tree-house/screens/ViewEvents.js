import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { firebase } from "../config";

const ViewEvents = () => {
  const [events, setEvents] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("Events")
      .onSnapshot((snapshot) => {
        const eventsList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEvents(eventsList);
      });

    return () => unsubscribe();
  }, []);

  const handleUpdate = (event) => {
    navigation.navigate("UpdateEvent", { event : event});
  };

  const handleDelete = (id) => {
    firebase.firestore().collection("Events").doc(id).delete();
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.eventContainer}>
      <View style={styles.eventDetails}>
        <Text style={styles.eventType}>{item.eventType}</Text>
        <Text style={styles.eventTime}>
          {item.eventTimeFrom} - {item.eventTimeTo}
        </Text>
      </View>
      <View style={styles.eventActions}>
        <TouchableOpacity
          style={styles.updateButton}
          onPress={() => handleUpdate(item)}
        >
          <AntDesign name="edit" size={24} color="#000000" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item.id)}
        >
          <AntDesign name="delete" size={24} color="#FFB057" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Events</Text>

      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  backButton: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  eventContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
  },
  eventDetails: {},
  eventType: {
    fontSize: 18,
    fontWeight: "bold",
  },
  eventTime: {
    fontSize: 16,
  },
  eventActions: {
    flexDirection: "row",
  },
  updateButton: {
    marginRight: 10,
  },
  deleteButton: {},
});

export default ViewEvents;
