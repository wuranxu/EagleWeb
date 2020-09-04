import {Form} from "antd";
import React from "react";
import getComponent from './index';

const {FormItem} = Form;

const CustomForm = ({left, right, formName, record, onFinish, fields}) => {
  const [form] = Form.useForm();
  const layout = {
    labelCol: {span: left},
    wrapperCol: {span: right},
  }
  return (
    <Form
      form={form}
      {...layout}
      name={formName}
      initialValues={record}
      onFinish={onFinish}
    >
      {
        fields.map(item => <FormItem label={item.label} colon={item.colon || true}
                                     rules={
                                       [{required: item.required, message: item.message}]
                                     } name={item.name}
        >
          {getComponent(item.type, item.placeholder, item.component)}
        </FormItem>)
      }
    </Form>
  )

}
export default CustomForm;
