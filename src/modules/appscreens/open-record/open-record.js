import React from 'react';

import {
View,
Text,
Button,
StyleSheet,
TouchableOpacity,
} from 'react-native';
 
import {Navigation} from 'react-native-navigation';
import Colors from '~/constants/colors.js';
import { updateRecord } from '~/actions/records';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DynamicForm from '~/modules/components/dynamic-form';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,

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
}); 
class OpenRecord extends React.Component {
 
  constructor(props){
    super(props)
  }

  componentDidMount() {
    console.log(this.props.currentRecord.recordObject);
  }

  state = {
    editRecord: false,
  }

  handleEditRecord = () => {

  }

  render() {
    const { editRecord } = this.state;

    return (
      <View style={styles.container}>
        <DynamicForm
          title="Dynamic Form"
          data={this.props.currentRecord.recordObject}
          model={this.props.currentForm.formArray}
          edit={true}
          updateRecord={this.updateRecord}
        />
        {editRecord ? (
          <TouchableOpacity style={styles.btn} onPress={this.handleEditRecord}>
            <Text style={styles.btnText}>Save Record</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    )
  }
}

OpenRecord.defaultProps = {
}

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateRecord
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(OpenRecord);

