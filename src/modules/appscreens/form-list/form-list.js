import React from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import { Navigation } from 'react-native-navigation';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

import SearchInput from '~/modules/components/search-input';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createForm } from '~/actions/forms';
import { goCreateFormPage, goRecordsPage } from '~/helpers/navigation';
import Colors from '~/constants/colors';
import Dialog from "react-native-dialog";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  popup: {
    backgroundColor: 'blue',
    opacity: 1,
    zIndex: 2,
  },
  sections: {
    paddingTop: 15,
    flexDirection: 'row',
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  formName: {
    fontSize:16,
    textTransform: 'capitalize',
  },
  formDescription: {
    fontSize: 10,
    color: 'grey'
  },
  fallbackText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconLeft: {
    paddingHorizontal: 10,
  },
  iconRight: {
    paddingHorizontal: 10,
    marginLeft: 'auto',
  }
});

class FormList extends React.Component {

  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  state = {
    app: "Forms",
    isDialogVisible: false,
    formName: "",
    searchForm: "",
    counter: 1,
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
    
    this.setState({ isDialogVisible: false }, () => {
      // if (!nameValidation && formName) {
        let newForm = { 
          formName,
          formArray: [],
          id: Math.round(new Date().getTime() * Math.random()),
          createdAt: Date.now()
        };
        this.props.createForm(newForm); // push a new form object
        goCreateFormPage(this.props.componentId, newForm);
      // }
    });
  }

  goToRecords = (currentForm) => {
    goRecordsPage(this.props.componentId, currentForm);
  }

  formList = () => {
    const {searchForm} = this.state;
    let model = this.props.forms.forms;
    if (searchForm != '') {
      model = model.filter(item => item.formName.toLowerCase().includes(searchForm.toLowerCase()));
    } 
    let _renderItem = ({ item }) => (
      <TouchableOpacity onPress={() => this.goToRecords(item)} style={styles.sections}>
        <View style={styles.iconLeft}>
          <FontAwesome color='#333'
            name="wpforms"
            size={30}
          />
        </View>
        <View>
          <Text style={styles.formName}>{item.formName}</Text>
          <Text style={styles.formDescription}>0 Records</Text>
        </View>
        <View style={styles.iconRight}>
          <FontAwesome color='grey'
            name="angle-right"
            size={30}
          />
        </View>
      </TouchableOpacity>
    );

    let _keyExtractor = (item,key) => `${key}`;

    return model.length ? (
      <FlatList
        data={model}
        renderItem={_renderItem}
        keyExtractor={_keyExtractor}
      />
    ) : (
        <View style={styles.fallbackText}>
          <Text>No Forms Found</Text>
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
