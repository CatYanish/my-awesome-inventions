import React, { Component } from 'react'
import { BITS } from '../constants/Bits'

export default class DropDown extends Component {
  render() {
    const {checkBitList, bitsUsed} = this.props
    return (
      <div>
        <select className="bits" name="bits" multiple>
          {Object.values(BITS).map((bit, i) => 
            <option key={bit} className={bitsUsed && bitsUsed.includes(bit) ? "selected" : ""} value={bit} onClick={checkBitList}>{bit}</option>
          ) 
          }
        </select>
        <p>Hold command and click to multiselect</p>
      </div>
    )
  }
}
