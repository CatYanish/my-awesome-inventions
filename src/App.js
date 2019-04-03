import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Amplify, {API,graphqlOperation} from 'aws-amplify';
import { withAuthenticator} from 'aws-amplify-react'; 
import aws_exports from './aws-exports'; // specify the location of aws-exports.js file on your project
Amplify.configure(aws_exports);

export const createInvention = `mutation CreateInvention($input: CreateInventionInput!) {
  createInvention(input: $input) {
    __typename
    id
    title
    description
    bitsUsed
    userName
    email
    otherMaterials
  }
}
`;

export const getInvention = `query GetInvention($id: ID!) {
  getInvention(id: $id) {
    __typename
    id
    title
    description
    bitsUsed
    userName
    email
    otherMaterials
  }
}
`;

export const listInventions = `query ListInventions(
  $filter: ModelInventionFilterInput
  $limit: Int
  $nextToken: String
) {
  listInventions(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      __typename
      id
      title
      description
      bitsUsed
      userName
      email
      otherMaterials
    }
    nextToken
  }
}
`;

export const updateInvention = `mutation UpdateInvention($input: UpdateInventionInput!) {
  updateInvention(input: $input) {
    __typename
    id
    title
    description
    bitsUsed
    userName
    email
    otherMaterials
  }
}
`;
export const deleteInvention = `mutation DeleteInvention($input: DeleteInventionInput!) {
  deleteInvention(input: $input) {
    __typename
    id
    title
    description
    bitsUsed
    userName
    email
    otherMaterials
  }
}
`;

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      id:"",
      title: "",
      description: "",
      bitsUsed: "",
      userName: "",
      email: "",
      otherMaterials: "",
      inventions: [],
      displayAdd:true,
      displayUpdate:false
    };
  
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  async componentDidMount(){
    const inventions = await API.graphql(graphqlOperation(listInventions));
    console.log(inventions.data)
    this.setState({inventions:inventions.data.listInventions.items});
  }

  addInventionName = (event) => {
    this.setState({title:event.target.value});
  }
  addDescription = (event) => {
    this.setState({description: event.target.value})
  }
  addBitsUsed = (event) => {
    this.setState({bitsUsed: [event.target.value]})
  }
  addUserName = (event) => {
    this.setState({userName: event.target.value})
  }
  addEmail = (event) => {
    this.setState({email: event.target.value})
  }
  addOtherMaterials = (event) => {
    this.setState({otherMaterials: [event.target.value]})
  }

  async handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    const invention = {
      "title":this.state.title,
      "description": this.state.description,
      "bitsUsed": this.state.bitsUsed,
      "userName": this.state.userName,
      "email": this.state.email,
      "otherMaterials": this.state.otherMaterials,
    }    
    await API.graphql(graphqlOperation(createInvention, { input: invention}));
    this.listInventions();
    this.setState({
      title: '',
      description: '',
      bitsUsed: '',
      userName: '',
      email: '',
      otherMaterials:'',});
  }
  async handleDelete(id) {
    const inventionId = {"id": id};
    await API.graphql(graphqlOperation(deleteInvention, { input: inventionId }));
    this.listInventions();
  }
  async handleUpdate(event) {
    event.preventDefault();
    event.stopPropagation();
    const invention = {
    "id":this.state.id,
    "title":this.state.title,
    "description": this.state.description,
    "bitsUsed": this.state.bitsUsed,
    "userName": this.state.userName,
    "email": this.state.email,
    "otherMaterials": this.state.otherMaterials,
  };
    await API.graphql(graphqlOperation(updateInvention, { input: invention}));
    this.listInventions();
    this.setState({displayAdd:true,displayUpdate:false,value:""});
  }
  selectInvention(invention){
    console.log('We called this shit!');
    
    this.setState({
      id:invention.id,
      title:invention.title,
      description:invention.description,
      bitsUsed: invention.bitsUsed,
      userName: invention.userName,
      email: invention.email,
      otherMaterials: invention.otherMaterials,
      displayAdd:false,
      displayUpdate:true,
    });

      console.log(this.state.displayUpdate);
      
  }
  async listInventions(){
    const inventions = await API.graphql(graphqlOperation(listInventions));
    console.log({inventions})
    this.setState({inventions:inventions.data.listInventions.items});
  }
  
  render() {
    const data = [].concat(this.state.inventions)
      .map((item,i)=> 
      <div className="alert alert-primary alert-dismissible show" role="alert">
        <span key={item.id} onClick={this.selectInvention.bind(this, item)}>{item.title}</span>
        <button key={item.name} type="button" className="close" data-dismiss="alert" onClick={this.handleDelete.bind(this, item.id)}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      )
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Little Bits</h1>
        </header>
        <br/>
        <div className="container">
          {this.state.displayAdd ?
            <form onSubmit={this.handleSubmit}>
            <input type="text" className="form-control form-control-lg" placeholder="Invention Name" value={this.state.title} onChange={this.addInventionName}/>
            <input type="text" className="form-control form-control-lg" placeholder="Description" value={this.state.description} onChange={this.addDescription}/>
              <div className="input-group mb-3">
              <input type="text" className="form-control form-control-lg" placeholder="Bits Used" value={this.state.bitsUsed} onChange={this.addBitsUsed}/>
                <input type="text" className="form-control form-control-lg" placeholder="Other Materials" value={this.state.otherMaterials} onChange={this.addOtherMaterials}/>
                <input type="text" className="form-control form-control-lg" placeholder="User Name" value={this.state.userName} onChange={this.addUserName}/>
                <input type="text" className="form-control form-control-lg" value={this.state.email} onChange={this.addEmail}/>
                <div className="input-group-append"></div>
                
                <button className="btn btn-primary" type="submit">Add Invention</button>
              </div>

            </form>
          : null }
          {this.state.displayUpdate ?
            <form onSubmit={this.handleUpdate}>
                <input type="text" className="form-control form-control-lg" placeholder={this.state.title} value={this.state.title} onChange={this.addInventionName}/>
                 <input type="text" className="form-control form-control-lg" placeholder="Description" value={this.state.description} onChange={this.addDescription}/>
                <input type="text" className="form-control form-control-lg" placeholder="Bits Used" value={this.state.bitsUsed} onChange={this.addBitsUsed}/>
                <input type="text" className="form-control form-control-lg" placeholder="Other Materials" value={this.state.otherMaterials} onChange={this.addOtherMaterials}/>
                <input type="text" className="form-control form-control-lg" placeholder="User Name" value={this.state.userName} onChange={this.addUserName}/>
                <input type="text" className="form-control form-control-lg" value={this.state.email} onChange={this.addEmail}/>
              <div className="input-group mb-3">
                <div className="input-group-append">
                  <button className="btn btn-primary" type="submit">Update Invention</button>
                </div>
              </div>
            </form>
          : null }
        </div>
        <br/>
        <div className="container">
          {data}
        </div>
      </div>
    );
  }
}
export default withAuthenticator(App, { includeGreetings: true });