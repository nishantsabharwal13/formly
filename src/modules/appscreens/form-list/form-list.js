import React from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native'
import { Navigation } from 'react-native-navigation';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import SearchInput from '~/modules/components/search-input';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createForm, deleteForm } from '~/actions/forms';
import { goCreateFormPage, goRecordsPage } from '~/helpers/navigation';
import Colors from '~/constants/colors';
import Dialog from "react-native-dialog";

import Card from '~/modules/global/card';
import SubText from '~/modules/global/sub-text';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  popup: {
    backgroundColor: 'blue',
    opacity: 1,
    zIndex: 2,
  },
  fallbackText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

class FormList extends React.Component {

  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
  }
  componentDidAppear() {
    this.state.edit && this.setState({ edit: false });
  }

  state = {
    app: "Forms",
    isDialogVisible: false,
    formName: "",
    searchForm: "",
    counter: 1,
    edit: false,
    errorMsg:'Enter name of the form to be created'
  }
  
  navigationButtonPressed = ({ buttonId }) => {
    buttonId === 'CreateForm' ? 
      this.setState({ isDialogVisible: true })
      : null;
    buttonId === 'SideMenu' ? 
      Navigation.mergeOptions('leftSideDrawer', {
        sideMenu: {
          left: {
            visible: true
          }
        }
      }) : null;
  }

  createForm = () => {
    const { formName,counter } = this.state;
    const { forms} = this.props.forms;
    const nameValidation = forms.length && forms.some( item => item.formName === formName);
    
    if (!nameValidation && formName) {
      this.setState({ isDialogVisible: false, errorMsg:'Enter name of the form to be created' }, () => {

        let newForm = { 
          formName,
          formArray: [],
          id: Math.round(new Date().getTime() * Math.random()),
          createdAt: Date.now()
        };
        this.props.createForm(newForm); // push a new form object
        goCreateFormPage(this.props.componentId, newForm);
      });
    } else {
      this.setState({errorMsg: '*This form name already exists*'});
    }
  }

  goToRecords = currentForm => {
    goRecordsPage(this.props.componentId, currentForm);
  }

  editEntry = currentForm => {
    goCreateFormPage(this.props.componentId, currentForm);
    this.state.edit && this.setState({ edit: false });
  }

  deleteEntry = form => {
    Alert.alert(
      'Are you sure to delete this Form?',
      form.formName,
      [
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
        { text: 'OK', onPress: () => this.props.deleteForm(form.id)},
      ],
      { cancelable: false }
    )
  }

  formList = () => {
    const {searchForm} = this.state;
    let model = this.props.forms.forms;
    if (searchForm != '') {
      model = model.filter(item => item.formName.toLowerCase().includes(searchForm.toLowerCase()));
    } 
    let _renderItem = ({ item }) => (
      <Card
        onPress={() => this.goToRecords(item)}
        name={item.formName}
        edit={this.state.edit}
        description={`Created on: ${formatDate(new Date(item.createdAt))}`}
        editEntry={() => this.editEntry(item)}
        deleteEntry={() => this.deleteEntry(item)}
        leftEle={(<MaterialCommunityIcons name="format-list-checkbox" size={30} color={Colors.lightText} />)}
      />
    );

    let _keyExtractor = (item,key) => `${key}`;

    return model.length ? (
      <FlatList
        data={model}
        renderItem={_renderItem}
        keyExtractor={_keyExtractor}
        extraData={this.state}
      />
    ) : (
        <View style={styles.fallbackText}>
          <Text style={{color:Colors.lightText}}>No Forms Found</Text>
          <Text style={{ color: Colors.lightText }}>Press + to create a new Form</Text>
        </View>
    )
  }

  render() {
    const {searchForm} = this.state;

    return (
      <View style={styles.container}>
      
        <SearchInput
          leftEle={(<Ionicons color='grey' name="ios-search" size={20} />)}
          placeholder='Search form by name'
          value={searchForm}
          onChange={searchForm => this.setState({ searchForm })}
        />
        <SubText 
          text="Forms"
          filterText={this.state.edit ? 'Unedit': 'Edit'}
          onPress={() => this.setState({ edit: !this.state.edit })}  
        />
        {this.formList()}

        <Dialog.Container visible={this.state.isDialogVisible}>
          <Dialog.Title>New Form Name</Dialog.Title>
          <Dialog.Description>
            {this.state.errorMsg}
          </Dialog.Description>
          <Dialog.Input autoFocus={true} onChangeText={(formName) => this.setState({ formName })}/>
          <Dialog.Button 
            label="Cancel" 
            style={{ color: Colors.topBar }} 
            onPress={() => this.setState({ isDialogVisible: false, errorMsg:'Enter name of the form to be created'})}
          />
          <Dialog.Button label="Create" style={{ color: Colors.topBar }} onPress={this.createForm}/>
        </Dialog.Container>
      </View>
    )
  }
};

function mapStateToProps(state) {
  return {
    forms: state.forms,
    records:state.records,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    createForm,
    deleteForm
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FormList);
