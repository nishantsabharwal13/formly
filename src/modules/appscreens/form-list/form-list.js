import React from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet,
} from 'react-native'
import { Navigation } from 'react-native-navigation';

import Icon from 'react-native-vector-icons/FontAwesome';
import { iconsMap } from '~/helpers/app-icons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createForm } from '~/actions/forms';

import DialogInput from 'react-native-dialog-input';


class FormList extends React.Component {

  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  componentDidMount() {
  }

  state = {
    app: "Forms",
    isDialogVisible: false,
  }

  navigationButtonPressed = ({ buttonId }) => {
    buttonId === 'CreateForm' ? 
      this.setState({ isDialogVisible: true })
      : null;
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Form list to come here</Text>
        <DialogInput
          style={styles.popup} 
          isDialogVisible={this.state.isDialogVisible}
          title={"New Form Name"}
          message={"Enter name of the form to be created"}
          submitInput={(inputText) => {
            this.setState({ isDialogVisible: false},() => {
              if(inputText) {
                const newForm = { [inputText]: [] }
                this.props.createForm(newForm); // push a new form object

                Navigation.push(this.props.componentId, {
                  component: {
                    id: 'FormCreate',
                    name: 'CreateForm',
                    options: {
                      topBar: {
                        title: {
                          text: inputText
                        },
                        rightButtons: [
                          {
                            id: 'AddField',
                            icon: iconsMap['ios-add']
                          }
                        ],
                      },
                    }
                  }
                })
              }
            });
          }}
          closeDialog={() => this.setState({ isDialogVisible: false})}>
        </DialogInput>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    alignItems: 'center'
  },
  popup: {
    backgroundColor: 'blue',
    opacity:1,
    zIndex: 2,
  }
});

function mapStateToProps(state) {
  return {
    forms: state.forms
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    createForm
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FormList);
