import React from 'react';
import axios from 'axios';
import ViewList from './components/ViewList';
import UserForm from './components/UserForm';

export default class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      route : 'viewList',
      userData : [],
    }

    this.handleUserSelector = this.handleUserSelector.bind(this);
    this.handleNewUser = this.handleNewUser.bind(this);
    this.createUser = this.createUser.bind(this);
    this.handleUpdateUser = this.handleUpdateUser.bind(this);
    this.handleGoBack = this.handleGoBack.bind(this);
  }

  componentDidMount(){
    //Get User Data
    axios.get('https://jsonplaceholder.typicode.com/users')
    .then (({data})=>{
      this.setState({userData : data});
    })
    .catch((err) => {
      console.log(err);
    });
  }


  handleUserSelector(id){
    this.setState({
      route          : 'viewForm',
      selectedUserID : id
    });
  }

  handleUpdateUser(userID,formData){
   
    axios.put(`https://jsonplaceholder.typicode.com/users/${userID}`,formData)
    .then(()=>{
      const newData = this.state.userData.map( x => x.id === userID ? formData : x );
      this.setState({
        userData : newData,
        route    : 'viewList'
      });
    })
    .catch((err)=>{
      console.log(err);
    });
  }

  handleNewUser(){
    this.setState({
      route          : 'viewForm',
      selectedUserID : undefined
    });
  }

  createUser(newUser){
    axios.post('https://jsonplaceholder.typicode.com/users',newUser)
    .then(({data})=>{
      const newData = this.state.userData.concat(data);
      this.setState({
        userData : newData,
        route    : 'viewList'
      });
    });
  }

  handleGoBack(){
    this.setState({route : 'viewList'});
  }
  

  render(){
    const { route, userData, selectedUserID } = this.state;

    const selectedUser =  selectedUserID && userData.find(x => x.id === selectedUserID);


    return (
      <div className="container mt-5">
      {route === 'viewList' && <ViewList 
        handleUserSelector={ this.handleUserSelector } 
        handleNewUser = {this.handleNewUser}
        userData= { userData } />
      }

      {route === 'viewForm' && <UserForm 
         createUser = {this.createUser}
         handleUpdateUser = {this.handleUpdateUser}
         updateUser = {selectedUser || {}}
         goBack = {this.handleGoBack}
      />}
      
      </div>
    )
  }
  
}