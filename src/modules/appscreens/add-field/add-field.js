import React from 'react';

import {
View,
Text,
Button,
StyleSheet,
TouchableOpacity,
FlatList,
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { homeDetails } from '~/actions/home';
import { iconsMap } from '~/helpers/app-icons';

import Colors from '~/constants/colors.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  fieldList: {
    
  },
  fieldName: {
    opacity: .7,
    padding: 16,
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,.1)',
    alignItems: 'center',
    justifyContent:'center',
  },
  fieldText: {
    fontWeight: '600',
    color:Colors.primary,
    fontSize: 16
  }
});

class AddField extends React.Component {
  state = {

  }

  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  async componentDidMount() {
    console.log(this.props.fields)
  }


  navigationButtonPressed = ({ buttonId }) => {
    buttonId === 'CloseModal' ?
      Navigation.dismissModal(this.props.componentId) 
      : null;

  }

  navigateToCustomize = () => {
    Navigation.showModal({
      stack: {
        children: [{
          component: {
            name: 'CustomizeField',
            passProps: {
              text: ''
            },
            options: {
              topBar: {
                title: {
                  text: 'Customize Field'
                },
                rightButtons: [
                  {
                    id: 'CloseCustomizeModal',
                    icon: iconsMap['ios-close'],
                  }
                ],
              },
            }
          }
        }]
      }
    });
  }
  
  render() {
    return (
      <View style="styles.container">
        <FlatList 
          style={styles.fieldList}
          data={this.props.fields}
          renderItem={({ item }) =>  (
              <TouchableOpacity 
                style={styles.fieldName}
                onPress={this.navigateToCustomize}>
                <Text style={styles.fieldText}>{item.fieldName}</Text>
              </TouchableOpacity>
            )
          }
          keyExtractor={item => item.id}
        />
      </View>

    );
  }
}

AddField.defaultProps = {
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

export default connect(mapStateToProps, mapDispatchToProps)(AddField);
