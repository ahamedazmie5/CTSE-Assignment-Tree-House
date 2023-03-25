import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  SafeAreaView,
  ScrollView,
  LeftContent,
} from "react-native";
import { TouchableOpacity } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";

export default function AdminHome({ navigation }) {
  return (
    <View>
      <ScrollView>
        <Card>
          <Card.Title
            title="Welcome Admin"
            subtitle="Manage the work easily"
            left={LeftContent}
            
          />

          <Card.Cover
            source={{
              uri: "https://img.freepik.com/free-vector/events-concept-illustration_114360-7733.jpg",
            }}
          />
          <Card.Actions>
          <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}onPress={() => navigation.navigate("AddEvents")}>Add Events</Text>
            </TouchableOpacity>
          </Card.Actions>
        </Card>
        <Card>
          <Card.Cover
            source={{
              uri: "https://img.freepik.com/free-vector/calendar-concept-illustration_114360-4461.jpg",
            }}
          />
          <Card.Actions>
            <TouchableOpacity style={styles.button}onPress={() => navigation.navigate("ViewEvents")}>
              <Text style={styles.buttonText}>Check Events</Text>
            </TouchableOpacity>
          </Card.Actions>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  titulo: {
    fontSize: 50,
    color: "#34434D",
    fontWeight: "bold",
    marginBottom: 80,
  },
  subtitle: {
    fontSize: 15,
    color: "gray",
    marginTop: 20,
  },
  textInput: {
    padding: 10,
    paddingStart: 30,
    width: "80%",
    height: 50,
    marginTop: 20,
    borderRadius: 30,
    backgroundColor: "#FBFAF3",
  },
  button: {
    backgroundColor: "#000",
    width: "60%",
    height: 40,
    padding: 10,
    borderRadius: 30,
    marginTop: 1,
    marginBottom: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
  },
});