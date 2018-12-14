import React from 'react';

import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';

import { Navigation } from 'react-native-navigation';
import ActionSheet from 'react-native-actionsheet';
import Colors from '~/constants/colors.js';
import DateTimePicker from 'react-native-modal-datetime-picker';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  sections: {
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  inputField: {
    height: 50,
    paddingBottom: 0,
  },
  picker: {
    height: 50,
    paddingTop: 16,
    paddingBottom: 16,
    color: 'grey',
    opacity: 0.7
  },
  btn: {
    backgroundColor: Colors.primary,
    padding: 16,
    alignItems: 'center',
    marginTop: 'auto',
  },
  btnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  datePickerBtn: {
    marginVertical: 20, padding: 20, alignItems: 'center',
    borderWidth:1,
    borderColor: 'grey',
    borderRadius: 8
  }
});

class DatePickerField extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {

  }

  state = {
    id: new Date().getTime()
    field: "datepicker",
    label: "",
    type: "default",
    isDateTimePickerVisible: false,
    currentDate: ''
  }

  formatDate = date => {

    const monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];

    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    console.log(date)
    this.setState({ currentDate:this.formatDate(date)});
    this._hideDateTimePicker();
  };

  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={[{ flex: 1, justifyContent: 'space-between' }]} >
        <View style={styles.sections}>
          <Text>Label</Text>
          <TextInput
            placeholder="Enter Label of Date Picker"
            style={styles.inputField}
            value={this.state.label}
            onChangeText={(label) => this.setState({ label })}
          />
        </View>

        <View style={styles.sections}>
          <Text>Select Default Date</Text>
          <Text style={{ color: '#ccc' }}>By default it will be current date</Text>
          <TouchableOpacity style={styles.datePickerBtn} onPress={this._showDateTimePicker}>
            <Text style={{ color: 'grey' }}>
            {this.state.currentDate || `Open DatePicker`} </Text>
          </TouchableOpacity>
            <DateTimePicker
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={this._handleDatePicked}
              onCancel={this._hideDateTimePicker}
            />
        </View>
        <TouchableOpacity style={styles.btn} onPress={() => this.props.saveField(this.state)}>
          <Text style={styles.btnText}>Save Field</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

DatePickerField.defaultProps = {
}

export default DatePickerField;
