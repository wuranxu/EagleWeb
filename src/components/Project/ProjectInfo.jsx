import React, {useEffect, useState} from 'react';
import {Row} from 'antd';
import CustomForm from "@/components/EagleForm/CustomForm";


export default ({data}) => {
  // const left, right, formName, record, onFinish, fields
  const fields = [
    {
      name: 'projectName',
      label: '项目名称',
      required: true,
      message: "请输入项目名称",
      type: 'input',
      placeholder: "请输入项目名称",
    },
    // {
    //   name: 'gitlabUrl',
    //   label: 'gitlab ID',
    //   required: true,
    //   message: "请输入gitlab项目id, 如有多个用,隔开",
    //   type: 'input',
    //   placeholder: "请输入gitlab项目id",
    // },
    // {
    //   name: 'description',
    //   label: '项目描述',
    //   required: false,
    //   message: "请输入项目描述",
    //   type: 'textarea',
    //   placeholder: "请输入项目描述",
    // },
  ]
  return (
    <Row gutter={8}>
      <CustomForm left={4} right={20} record={data} onFinish={()=>{}} fields={fields}/>
    </Row>
  )
}
