import React, { Component } from 'react'
import DropDown from './DropDown';

export default class InventionForm extends Component {
  render() {
    const { isAdd, handleUpdate, handleSubmit, bitsUsed, title, description, otherMaterials, userName, email, addInfo, checkBitList } = this.props
    return (
      <form onSubmit={isAdd ? handleSubmit : handleUpdate}>
        <input value={title} onChange={addInfo} id="title" type="text" className="form-control form-control-lg" placeholder="Invention Name"/>
        <input value={description} id="description" onChange={addInfo} type="text" className="form-control form-control-lg" placeholder="Description" />
        <input value={otherMaterials} onChange={addInfo} id="other-materials" type="text" className="form-control form-control-lg" placeholder="Other Materials" />
        <input value={userName} onChange={addInfo} id="user-name" type="text" className="form-control form-control-lg" placeholder="User Name"/>
        <input value={email} onChange={addInfo} id="email" type="text" className="form-control form-control-lg" placeholder="email"/>  
        <input readOnly type="text" className="form-control form-control-lg" placeholder="Bits Used" value={bitsUsed} onChange={this.addBitsUsed}/>
        <DropDown checkBitList={checkBitList} bitsUsed={bitsUsed}/>
        <button className="btn btn-primary" type="submit">{isAdd ? "Add Invention" : "Update Invention"}</button>
      </form>
    )
  }
}
