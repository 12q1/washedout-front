import React, { Component } from "react";
import { connect } from "react-redux";
import setLocation from "../actions/users/set-location";
import t from "tcomb-form-native";
import Location, { formOptions } from "../models/Location";
import { View } from "react-native";
import { ScrollView } from "react-native";
import { Text } from "react-native";
import { TouchableHighlight } from "react-native";
import { Actions } from "react-native-router-flux";
import { StyleSheet } from "react-native";
import styles from "../screens/SignUp.styles";

class AddLocationForm extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      newLocation: null
    };
  }

  onSubmit() {
    const location = this.state.newLocation;
    if (!location) return;
    this.props.setLocation(this.props.user.id, location);
    this.clearForm();
  }

  clearForm() {
    this.setState({
      newLocation: null
    });
  }

  onChange(newLocation) {
    this.setState({ newLocation });
  }

  componentDidUpdate() {
    if (this.props.user && this.props.user.location) {
      Actions.addServicesForm();
    }
  }

  render() {
    const Form = t.form.Form;
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.title}>Location</Text>
          <Form
            ref="form"
            type={Location}
            options={formOptions}
            value={this.state.newLocation}
            onChange={this.onChange}
          />
        </ScrollView>
        <TouchableHighlight onPress={this.onSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const mdtp = { setLocation };
const mstp = ({ user }) => ({ user });

export default connect(
  mstp,
  mdtp
)(AddLocationForm);
