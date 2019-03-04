import React, { Component } from "react";
import { StyleSheet, Dimensions, Image, ScrollView } from "react-native";
import { Block, Input, Icon, theme, Button } from "galio-framework";
import { SocketClient } from "../bl/socket";

console.ignoredYellowBox = ["Remote debugger"];
import { YellowBox } from "react-native";
YellowBox.ignoreWarnings([
  "Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?"
]);

const { width } = Dimensions.get("screen");
export class ConfigScreen extends Component {
  navigation = this.props;
  logo = require("../assets/images/socket-io-logo.png");
  state = {
    formData: {
      serverAddress: "",
      room: "",
      event: "",
      data: ""
    },
    isConnected: false
  };

  // this is socket client that is working, it will hold the socket client when successfully connected.
  socketClient;

  getSocketClient() {
    const socketClient = new SocketClient(this.state.formData);
    return socketClient;
  }

  updateIsConnectedStatus(connected) {
    const state = this.state;
    state.isConnected = connected;
    this.setState(state);
  }

  // emit
  emit() {
    console.log(this.state.isConnected)
    if(!this.state.isConnected) {
      alert('please connect to server');
      return;
    }

    this.socketClient.emit(this.state.formData.data);
  }

  // connect
  connect() {
    this.socketClient = socketClient = this.getSocketClient();

    // set connect event function.
    this.socketClient.onConnect = (() => {
      alert("connected");
      this.updateIsConnectedStatus(true);
    }).bind(this);

    // call connection method.
    this.socketClient.connect();
  }

  disconnect() {
    // set disconnect event function.
    if (!this.socketClient.onDisconnect)
      this.socketClient.onDisconnect = (() => {
        this.updateIsConnectedStatus(false);
      }).bind(this);

    // call disconnection method.
    this.socketClient.disconnect();
  }

  render() {
    return (
      <Block style={styles.page}>
        <Image source={this.logo} style={styles.logo} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Block flex center>
            <Input
              right
              color="black"
              style={styles.input}
              placeholder="Server Address"
              value={this.state.formData.serverAddress}
              onChangeText={t => {
                const state = this.state;
                state.formData.serverAddress = t;
                this.setState(state);
              }}
            />
            <Input
              right
              color="black"
              style={styles.input}
              placeholder="Room"
              value={this.state.formData.room}
              onChangeText={t => {
                const state = this.state;
                state.formData.room = t;
                this.setState(state);
              }}
            />
            <Input
              right
              color="black"
              style={styles.input}
              placeholder="Event"
              value={this.state.formData.event}
              onChangeText={t => {
                const state = this.state;
                state.formData.event = t;
                this.setState(state);
              }}
            />
            <Input
              right
              color="black"
              style={styles.input}
              placeholder="Data"
              value={this.state.formData.data}
              onChangeText={t => {
                const state = this.state;
                state.formData.data = t;
                this.setState(state);
              }}
            />
            <Block row>
              <Button disabled={!this.state.isConnected} style={styles.btn} onPress={this.emit.bind(this)}>
                Emit
              </Button>
              {this.state.isConnected ? (
                <Button
                  color="error"
                  style={styles.btn}
                  onPress={this.disconnect.bind(this)}
                >
                  Disconnect
                </Button>
              ) : (
                <Button
                  color="success"
                  style={styles.btn}
                  onPress={this.connect.bind(this)}
                >
                  Connect
                </Button>
              )}
            </Block>
          </Block>
        </ScrollView>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    width: 266,
    height: 200,
    alignSelf: "center",
    marginBottom: 50
  },
  page: {
    marginTop: 50
  },
  input: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3
  },
  btn: {
    flex: 2,
    flexDirection: "column",
    margin: 4
  }
});
