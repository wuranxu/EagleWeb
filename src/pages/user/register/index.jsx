import React from 'react';
import {connect, Link} from 'umi';
import {Button, Form, Input} from 'antd';
import styles from './Register.less';

const FormItem = Form.Item;


const Index = ({loading, dispatch}) => {

  const [form] = Form.useForm();

  const onFinish = values => {
    // 删除二次确认密码
    dispatch({
      type: 'user/register',
      payload: {
        name: values.name,
        email: values.email,
        tel: values.tel,
        role: 0,
        nickname: values.nickname,
        password: values.password,
      }
    })
  }

  return (
    <div className={styles.main}>
      <h3>
        注册
      </h3>
      <Form onFinish={onFinish} form={form}>
        <FormItem
          rules={
            [{
              required: true,
              message: "请填写用户名",
            }]
          } name='name'>
          <Input size="large" placeholder="请填写用户名"/>
        </FormItem>
        <FormItem
          rules={
            [{
              required: true,
              message: "请填写昵称",
            }]
          } name='nickname'
        >
          <Input size="large" placeholder="请填写昵称"/>
        </FormItem>
        <FormItem rules={
          [
            {
              required: true,
              message: "请填写用户邮箱",
            },
            {
              type: 'email',
              message: "邮箱格式不正确",
            },
          ]
        } name='email'
        >
          <Input size="large" placeholder="请填写用户邮箱"/>
        </FormItem>
        <FormItem
          rules={
            [{
              required: true,
              message: "请填写用户密码",
            }]
          } name='password'
        >
          <Input
            size="large"
            type="password"
            placeholder="请输入用户密码"
          />
        </FormItem>
        <FormItem
          dependencies={['password']}
          rules={
            [
              {
                required: true,
                message: '请再次输入密码',
              },
              ({getFieldValue}) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  // eslint-disable-next-line prefer-promise-reject-errors
                  return Promise.reject('二次输入密码不一致!');
                },
              }),
            ]
          } name='password_confirm'
        >
          <Input
            size="large"
            type="password"
            placeholder="请再次输入用户密码"
          />
        </FormItem>
        <FormItem
          rules={
            [
              {
                required: true,
                message: "请填写手机号",
              },
              {
                pattern: /^\d{11}$/,
                message: "手机号码格式不正确",
              },
            ]
          } name='tel'>
          <Input
            size="large"
            placeholder="请填写手机号"
          />
        </FormItem>
        <FormItem>
          <Button
            loading={loading.effects['user/register']}
            size="large"
            className={styles.submit}
            type="primary"
            htmlType="submit"
          >
            注册
          </Button>
          <Link className={styles.login} to="/user/login">
            使用已有账户登录
          </Link>
        </FormItem>
      </Form>
    </div>
  )
}

export default connect(({user, loading}) => ({user, loading}))(Index);
