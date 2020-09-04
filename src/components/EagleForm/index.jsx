import {Input} from "antd";
import React from "react";

const {TextArea} = Input;

export default (type, placeholder, component = undefined) => {
  if (component) {
    return component;
  }
  if (type === 'input') {
    return <Input placeholder={placeholder}/>
  }
  if (type === 'textarea') {
    return <TextArea placeholder={placeholder}/>
  }
  return null;
}
