import React, { Component } from "react";
import { View, Text, StyleSheet,TouchableOpacity, Touchable } from "react-native";
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from "expo-barcode-scanner";

export default class TransactionScreen extends Component {
  constructor(props){
    super(props);
    this.state={
      domState:'normal',
      hasCameraPermissions:null,
      scanned:false,
      scannedData:"",

    }
  }
  getCameraPermissions=async domState=>{
    const{status}=await Permissions.askAsync(Permissions.CAMERA)
    this.setState({
      hasCameraPermissions:status==="granted",
      domState:domState,
      scanned:false,
    })
  }

  handleBarCodeScanned=async({type,data})=>{
    this.setState({
      scannedData:data,
      domState:"normal",
      scanned:true,

    })
  }

  
  render() {
    const {domState,hasCameraPermissions,scannedData,scanned}=this.state;
    if(domState==="scanner"){
      return(
        <BarCodeScanner
        onBarCodeScanned={scanned?undefined:this.handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}/>

      )
    }
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{
        hasCameraPermissions?scannedData:"request for camera permission"
        }</Text>

        <TouchableOpacity style={styles.button} onPress={()=>this.getCameraPermissions("scanner")}>Scan QR Code</TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5653D4"
  },
  text: {
    color: "#ffff",
    fontSize: 30
  },
  button: {
    backgroundColor:'#699df0',
    width:120,
    height:30,
    fontSize:20,
    color:'white',
    marginTop:30

  }
});
