import React, { useState, useRef } from 'react'
import { View, StyleSheet, StatusBar, PanResponder, TouchableOpacity, Text, Alert } from 'react-native'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import Canvas from 'react-native-canvas';
import { captureScreen } from 'react-native-view-shot';
const App = () => {

  const [isDrawing, setIsDrawing] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const canvasRef = useRef(null)

  function startDrawing(event) {
    setIsDrawing(true);
    setX(event.nativeEvent.locationX);
    setY(event.nativeEvent.locationY);
  }

  function finishDrawing() {
    setIsDrawing(false);
  }

  function takeScreenshot() {
    captureScreen({
      format: "jpg",
      quality: 0.8
    })
      .then(
        uri => {
          Alert.alert(
            "Screen Shot",
            "Screenshot has been taken Successfully!",
            [
              {
                text: "OK",
                onPress: () => console.log("screenshot taken", uri)
              }
            ],
            { cancelable: false }
          );
        },
        error => console.error("Oops, Something went wrong", error)
      );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.drawingArea}
        onPressIn={startDrawing}
        onPressOut={finishDrawing}>
        <Canvas ref={canvasRef}>
          {({ canvas, width, height }) => {
            if (isDrawing) {
              const ctx = canvas.getContext("2d");
              ctx.beginPath();
              ctx.arc(x, y, 30, 0, 2 * Math.PI);
              ctx.fillStyle = "red";
              ctx.fill();
            }
          }}
        </Canvas>
      </TouchableOpacity>
      <TouchableOpacity style={styles.captureBtn} onPress={takeScreenshot}>
        <Text>Take Screenshot</Text>
      </TouchableOpacity>
    </View>
  )

}
export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff"
  },
  drawingArea: {
    width: "90%",
    height: "80%",
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center"
  },
  captureBtn: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#2196f3",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5
  },
});