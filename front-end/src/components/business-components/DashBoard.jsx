import React, { Component } from 'react'
import FileManagement from './FileManagement'
import DisplayFiles from './DisplayFiles'
import Practice from './Practice'

export default class DashBoard extends Component {
  render() {
    return (
        <>
      <FileManagement/>
      <DisplayFiles/>
      {/* <Practice/> */}
     
      </>
    )
  }
}
