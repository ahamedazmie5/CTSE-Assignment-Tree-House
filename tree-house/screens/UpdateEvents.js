import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { firebase } from "../config";
import { ScrollView } from "react-native";

const UpdateEvents = ({ route }) => {
  const event = route.params.event;
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [eventType, setEventType] = useState("");
  const [eventTimeFrom, setEventTimeFrom] = useState("");
  const [eventTimeTo, setEventTimeTo] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    const eventRef = firebase.firestore().collection("Events").doc(event.id);
    eventRef
      .get()
      .then((doc) => {
        const event = doc.data();
        setName(event.name);
        setPhone(event.phone);
        setEmail(event.email);
        setEventType(event.eventType);
        setEventTimeFrom(event.eventTimeFrom);
        setEventTimeTo(event.eventTimeTo);
      })
      .catch((error) => {
        console.log("Error getting event:", error);
      });
  }, [event.id]);

  const handleUpdate = async () => {
    if (!validatePhone()) {
      return;
    }

    if (!validateEmail()) {
      return;
    }

    const eventRef = firebase.firestore().collection("Events").doc(event.id);
    eventRef
      .update({
        name,
        phone,
        email,
        eventType,
        eventTimeFrom,
        eventTimeTo,
      })
      .then(() => {
        console.log("Event successfully updated!");
        alert("Event successfully updated!");
        navigation.navigate("ViewEvents", { event: event });
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = async () => {
    const eventRef = firebase.firestore().collection("Events").doc(event.id);
    eventRef
      .delete()
      .then(() => {
        console.log("Event successfully deleted!");
        alert("Event successfully deleted!");
        navigation.navigate("ViewEvents");
      })
      .catch((error) => console.log(error));
  };

  const cancel = () => {
    navigation.navigate("ViewEvents");
  };

  const validatePhone = () => {
    if (phone.length !== 10) {
      setPhoneError("Phone number must be 10 digits");
      return false;
    }

    setPhoneError("");
    return true;
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setEmailError("Invalid email address");
      return false;
    }

    setEmailError("");
    return true;
  };

  return (
    
  <ScrollView style={styles.container}>
    <View style={styles.container}>
      <Text style={styles.title}>Update Event</Text>

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
          <TouchableOpacity style={styles.submitButton} onPress={handleUpdate}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={cancel}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
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

export default UpdateEvents;