import React, { useState } from 'react';
import { Button, View, StyleSheet, Alert, Image, Text, Platform, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { Modal } from 'react-native';

export default function App() {

  const [timeline, setTimeline] = useState("Today");
  const [paymentType, setPaymentType] = useState("All");

  const [timelineVisible, setTimelineVisible] = useState(false);
  const [paymentVisible, setPaymentVisible] = useState(false);

  const timelineOptions = ["Today", "This Week", "This Month"];
  const paymentOptions = ["Cash", "UPI", "Card", "All"];


  const renderOption = (option: any, setter: any, closeModal: any) => (
    <TouchableOpacity
      style={styles.optionItem}
      onPress={() => {
        setter(option);
        closeModal(false);
      }}
    >
      <Text style={styles.optionText}>{option}</Text>
    </TouchableOpacity>
  );



  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reports</Text>
      <View style={styles.reportsContainer}>
        <Text style={styles.text}>Filter By</Text>

        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setTimelineVisible(true)}
        >
          <Text style={styles.dropdownText}>Timeline: {timeline} ⌄</Text>
        </TouchableOpacity>


        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setPaymentVisible(true)}
        >
          <Text style={styles.dropdownText}>Payment Type: {paymentType} ⌄</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.subcontainer}>
        <View style={styles.totalAmountBox}>
          <Text style={styles.amountTitle}>Total received</Text>
          <Text style={styles.amount}>₹18,000</Text>
        </View>

        <View style={styles.blanceAmountBox}>
          <Text style={styles.blanceTitle}>All time balance</Text>
          <Text style={styles.blance}>₹18,000</Text>
        </View>
      </View>











      <Modal transparent visible={timelineVisible} animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setTimelineVisible(false)}
        >
          <View style={styles.modalBox}>
            {timelineOptions.map((item) =>
              renderOption(item, setTimeline, setTimelineVisible)
            )}
          </View>
        </TouchableOpacity>
      </Modal>


      <Modal transparent visible={paymentVisible} animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setPaymentVisible(false)}
        >
          <View style={styles.modalBox}>
            {paymentOptions.map((item) =>
              renderOption(item, setPaymentType, setPaymentVisible)
            )}
          </View>
        </TouchableOpacity>
      </Modal>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    backgroundColor: "#ffffff"
  },
  title: {
    fontFamily: "Jost",
    color: "#111827",
    fontWeight: 700,
    paddingTop: 30,
  },
  text: {
    fontFamily: "Jost",
    color: "#111827",
    fontWeight: 700,
    top: 6,
    fontSize: 14
  },
  totalAmountBox: {
    width: "50%",
    borderColor: "#1B1A18",
    backgroundColor: "#1B1A18",
    borderRadius: 15,
    padding: 15,
    borderWidth: 1,

  },
  amountTitle: {
    color: "#FFFFFF",
    fontWeight: 700,
    fontFamily: "Jost",
    textAlign: "left",
    paddingLeft: 10
  },
  amount: {
    color: "#FFFFFF",
    fontWeight: 700,
    fontFamily: "Jost",
    textAlign: "left",
    fontSize: 18,
    paddingLeft: 19,
    top: 5,
    paddingBottom: 10
  },
  blanceAmountBox: {
    width: "50%",
    borderColor: "#1B1A18",
    borderWidth: 1,
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 15,
  },
  blanceTitle:{
    color: "#1B1A18",
    fontWeight: 700,
    fontFamily: "Jost",
    textAlign: "left",
    paddingLeft: 10
  },
  blance:{
    color: "#1B1A18",
    fontWeight: 700,
    fontFamily: "Jost",
    textAlign: "left",
    fontSize: 18,
    paddingLeft: 19,
    top: 5,
    paddingBottom: 10
  },
  reportsContainer: {
    paddingTop: 20,
    flexDirection: "row",
    gap: 8,
    justifyContent: "space-around"
  },
  subcontainer: {
    paddingTop: 20,
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-around"
  },
  dropdown: {
    backgroundColor: "#000",
    paddingHorizontal: 3,
    paddingVertical: 8,
    borderRadius: 8,
  },
  dropdownText: {
    color: "#fff",
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    paddingTop: 110,
    paddingLeft: 100,
    justifyContent: "flex-start",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalBox: {
    width: "50%",
    marginHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
  },
  optionItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  optionText: {
    fontSize: 16,
  },
})