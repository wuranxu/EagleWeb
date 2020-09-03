import React, {PureComponent} from "react";
import {Modal, Select, Button, Input, Form} from "antd";


const {TextArea} = Input;
const FormItem = Form.Item;

const getComponent = (type, placeholder, component = undefined) => {
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


const FormForModal = ({title, width, left, right, formName, record, onFinish, fields, visible, onCancel}) => {
  const [form] = Form.useForm();
  const onOk = () => {
    form.validateFields().then((values) => {
      onFinish(values);
    })
  }
  const layout = {
    labelCol: {span: left},
    wrapperCol: {span: right},
  }
  return (
    <Modal
      destroyOnClose
      title={title} width={width} visible={visible} onOk={onOk} onCancel={onCancel}>
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
    </Modal>
  )

}
export default FormForModal;

// export default class FormForModal extends PureComponent {
//
//   form = Form.create();
//
//
//   onFinish = () => {
//     this.form.submit();
//   }
//
//   render() {
//     const {title, width, left, right, formName, record, onFinish, fields, visible, onCancel} = this.props;
//     const layout = {
//       labelCol: {span: left},
//       wrapperCol: {span: right},
//     }
//     return (
//       <Modal title={title} width={width} visible={visible} onOk={this.onFinish} onCancel={onCancel}>
//         <Form
//           form={this.form}
//           {...layout}
//           name={formName}
//           initialValues={record}
//           onFinish={onFinish}
//         >
//           {
//             fields.map(item => <FormItem label={item.label} colon={item.colon || true}
//                                          rules={
//                                            [{required: item.required, message: item.message}]
//                                          } name={item.name}
//             >
//               {getComponent(item.type, item.placeholder)}
//             </FormItem>)
//           }
//         </Form>
//       </Modal>
//     );
//   }
// }
