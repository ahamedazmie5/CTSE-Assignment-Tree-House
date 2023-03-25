import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { firebase } from "../config";
import { ScrollView } from "react-native";

const AddEvents = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [eventType, setEventType] = useState("");
  const [eventTimeFrom, setEventTimeFrom] = useState("");
  const [eventTimeTo, setEventTimeTo] = useState("");

  const navigation = useNavigation();

  const handleSubmit = async () => {
    if (!name || !phone || !email || !eventType || !eventTimeFrom || !eventTimeTo) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    if (!phone.match(/^\d{10}$/)) {
      Alert.alert('Error', 'Phone number must be 10 digits.');
      return;
    }

    if (!email.match(/^\S+@\S+\.\S+$/)) {
      Alert.alert('Error', 'Invalid email format.');
      return;
    }

    firebase
      .firestore()
      .collection("Events")
      .add({
        name,
        phone,
        email,
        eventType,
        eventTimeFrom,
        eventTimeTo,
      })
      .then(() => {
        console.log("Event successfully added!");
        alert("Event successfully added!");
        navigation.navigate("EventsHome", { event: event });
      })
      .catch((error) => console.log(error));
  };

  const cancel = () => {
    navigation.navigate("EventsHome");
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Create New Event</Text>

      <View style={styles.form}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Name of the customer</Text>
          <TextInput style={styles.input} value={name} onChangeText={setName} />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Telephone Number</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Customer email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Event Type</Text>
          <TextInput
            style={styles.input}
            value={eventType}
            onChangeText={setEventType}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Event Time From</Text>
          <TextInput
            style={styles.input}
            value={eventTimeFrom}
            onChangeText={setEventTimeFrom}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Event Time To</Text>
          <TextInput
            style={styles.input}
            value={eventTimeTo}
            onChangeText={setEventTimeTo}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={cancel}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View> 
    </ScrollView>
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
  form: {
    flex: 1,
  },
  formGroup: {
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
    fontSize: 18,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  submitButton: {
    backgroundColor: "#FFB057",
    padding: 10,
    borderRadius: 4,
    width: "45%",
  },
  cancelButton: {
    backgroundColor: "#000000",
    padding: 10,
    borderRadius: 4,
    width: "45%",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
  },
});

export default AddEvents;
