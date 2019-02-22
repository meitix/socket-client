import React, { Component } from "react";
import { StyleSheet, Dimensions, Image , ScrollView } from "react-native";
import { Block, Input, Icon , theme , Button} from "galio-framework";

const { width } = Dimensions.get("screen");
export class ConfigScreen extends Component {
  logo = require("../assets/images/socket-io-logo.png");
   state = {formData: {
        serverAddress: '',
        room: '',
        event: '',
        data: ''
    }};

    emit() {
        alert(this.state.formData.serverAddress)
    }


  render() {
    const iconCamera = (
      <Icon
        size={16}
        color={theme.COLORS.MUTED}
        name="camera-18"
        family="GalioExtra"
      />
    );
    const { navigation } = this.props;

    return (
      <Block style={styles.page}>
        <Image source={this.logo} style={styles.logo} />
        <ScrollView   showsVerticalScrollIndicator={false}>
        <Block flex center >
        <Input
            right
            color="black"
            style={styles.input}
            iconContent={iconCamera}
            placeholder="Server Address"
            value={this.state.formData.serverAddress}
            onChangeText={t => {
                const state = this.state;
                state.formData.serverAddress = t;
                this.setState(state)
            }}
          />
          <Input
            right
            color="black"
            style={styles.input}
            iconContent={iconCamera}
            placeholder="Room"
          />
          <Input
            right
            color="black"
            style={styles.input}
            iconContent={iconCamera}
            placeholder="Event"
          />
          <Input
            right
            color="black"
            style={styles.input}
            placeholder="Data"
          />
            <Button style={styles.btn} onPress={this.emit.bind(this)}>Emit</Button>
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
      alignSelf: 'center'
  }
});
