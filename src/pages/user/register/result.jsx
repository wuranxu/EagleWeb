import React from "react";
import {Result, Button} from 'antd';
import {history} from 'umi';

export default () => {
  return (
    <Result
      status="success"
      title="恭喜您注册成功!"
      subTitle="点击『返回首页』按钮, 开始新的旅程吧！"
      extra={[
        <Button type="primary" key="console" onClick={() => {
          history.push("/");
        }}>
          返回首页
        </Button>,
      ]}
    />
  )
}
