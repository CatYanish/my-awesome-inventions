import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Amplify, {API,graphqlOperation} from 'aws-amplify';
import { withAuthenticator} from 'aws-amplify-react'; 
import aws_exports from './aws-exports';
import InventionForm from './components/InventionForm'
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
      bitsUsed: [],
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
    this.setState({inventions:inventions.data.listInventions.items});
  }


  addInfo = (event, type) => {
    switch (event.target.id) {
      case "title":
        this.setState({title:event.target.value});
        break;
      case "description":
        this.setState({description: event.target.value})
        break;
      case "user-name":
        this.setState({userName: event.target.value})
        break;
      case "email":
        this.setState({email: event.target.value})
        break;
      case "other-materials":
       this.setState({otherMaterials: [event.target.value]})
        break;
      default:
        break;
    }
  }


  checkBitList = (event) => {
    let filteredBitsList;
    if (event.target.value !== undefined) {
      if (this.state.bitsUsed.includes(event.target.value)) {
       filteredBitsList = this.state.bitsUsed.filter(function(value, index, arr){
          return value !== event.target.value;
      });
      this.setState({bitsUsed: filteredBitsList})
      } else {
        let newList = this.state.bitsUsed
        newList.push(event.target.value)
        this.setState({bitsUsed: newList})
      }
    }
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
      bitsUsed: [],
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
    this.setState({
      title: '',
      description: '',
      bitsUsed: [],
      userName: '',
      email: '',
      otherMaterials:'',
      displayAdd:true,
      displayUpdate:false,});
  }
  selectInvention(invention){
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
  }
  async listInventions(){
    const inventions = await API.graphql(graphqlOperation(listInventions));
    this.setState({inventions:inventions.data.listInventions.items});
  }
  
  render() {
    const data = [].concat(this.state.inventions)
      .map((item,i)=> 
      <div key={item.id + i} className="alert alert-primary alert-dismissible show invention-item" role="alert">
        <span key={item.id} onClick={this.selectInvention.bind(this, item)}>{item.title}</span>
        <button key={item.id + item.title} type="button" className="close" data-dismiss="alert" onClick={this.handleDelete.bind(this, item.id)}>
          <span key={item.title} aria-hidden="true">&times;</span>
        </button>
      </div>
      )
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Little Bits</h1>
        </header>
        <br/>
        <div className="container">
          {this.state.displayAdd ?
            <InventionForm 
              handleSubmit={this.handleSubmit}
              isAdd={true}
              title={this.state.title}
              description={this.state.description}
              bitsUsed={this.state.bitsUsed}
              otherMaterials={this.state.otherMaterials}
              userName={this.state.userName}
              email={this.state.email}
              addInfo={this.addInfo}
              checkBitList={this.checkBitList}
             />
          : null }
          {this.state.displayUpdate ?
              <InventionForm 
                handleSubmit={this.handleSubmit}
                handleUpdate={this.handleUpdate}
                isAdd={false}
                title={this.state.title}
                description={this.state.description}
                bitsUsed={this.state.bitsUsed}
                otherMaterials={this.state.otherMaterials}
                userName={this.state.userName}
                email={this.state.email}
                addInfo={this.addInfo}
                checkBitList={this.checkBitList}
              />
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