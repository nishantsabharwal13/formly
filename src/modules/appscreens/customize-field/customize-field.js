import React from 'react';

import {
View,
Text,
Button,
StyleSheet,
TouchableOpacity,
} from 'react-native';
import ActionSheet from 'react-native-actionsheet';

import {Navigation} from 'react-native-navigation';
import Colors from '~/constants/colors.js';

import { iconsMap } from '~/helpers/app-icons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import TextField from '~/modules/components/text-field';

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding:10,
  },

})
 
class CustomizeField extends React.Component {
  constructor(props){
   super(props);
    Navigation.events().bindComponent(this);
  }

  async componentDidMount() {

  }

  navigationButtonPressed = ({ buttonId }) => {
    buttonId === 'CloseCustomizeModal' ?
      Navigation.dismissModal(this.props.componentId)
      : null;
  };
 
  state = {
    type: 'default',
    formDetails: [],
  }
  
  
  handleField = (data) => {
    this.props.createField(data);
    Navigation.dismissAllModals();
  }

  render() {
    const {id} = this.props.currentField;
    
    const renderFieldDetails = () => {
      switch (id) {
        case '1':
          return (
            <TextField 
              currentField={this.props.currentField}
              saveField={this.handleField}
            />
          );
      }
    }

    return (
      <View style={styles.container}>
        {renderFieldDetails()}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    fields: state.fields
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomizeField);
