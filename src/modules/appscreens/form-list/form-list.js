import React from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
} from 'react-native'
import { Navigation } from 'react-native-navigation';

import Icon from 'react-native-vector-icons/FontAwesome';
import SearchInput from '~/modules/components/search-input';

import { iconsMap } from '~/helpers/app-icons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createForm } from '~/actions/forms';
import { goCreateFormPage } from '~/helpers/navigation';

import Dialog from "react-native-dialog";


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
    formName: "",
    searchForm: ""
  }
  
  navigationButtonPressed = ({ buttonId }) => {
    buttonId === 'CreateForm' ? 
      this.setState({ isDialogVisible: true })
      : null;
  }

  createForm = () => {
    const { formName } = this.state;
    const nameValidation = Object.keys(this.props.forms.forms).includes(formName);

    this.setState({ isDialogVisible: false }, () => {
      if (!nameValidation && formName) {
        let newForm = { [formName]: [] };
        this.props.createForm(newForm); // push a new form object
        goCreateFormPage(this.props.componentId, formName);
      }
    });
  }

  formList = () => {
    let model = Object.keys(this.props.forms.forms);

    let _renderItem = ({ item }) => (
            <View>
              <Text style="styles">{item}</Text>
            </View>
          );

    let _keyExtractor = (item,key) => key;

    return (
      <FlatList
        data={model}
        renderItem={_renderItem}
        keyExtractor={_keyExtractor}
      />
    )
  }

  render() {
    const {searchForm} = this.state;

    return (
      <View style={styles.container}>
      
        <SearchInput
          placeholder='Search form by name'
          value={searchForm}
          onChange={searchForm => this.setState({ searchForm })}
        />

        {this.formList()}

        <Dialog.Container visible={this.state.isDialogVisible}>
          <Dialog.Title>New Form Name</Dialog.Title>
          <Dialog.Description>
            Enter name of the form to be created
          </Dialog.Description>
          <Dialog.Input onChangeText={(formName) => this.setState({ formName })}/>
          <Dialog.Button label="Cancel" onPress={() => this.setState({ isDialogVisible: false})}/>
          <Dialog.Button label="Create" onPress={this.createForm}/>
        </Dialog.Container>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  popup: {
    backgroundColor: 'blue',
    opacity:1,
    zIndex: 2,
  },
  sections: {
    
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
