import {AlipayCircleOutlined, TaobaoCircleOutlined, WeiboCircleOutlined} from '@ant-design/icons';
import {Alert, Checkbox} from 'antd';
import React, {useState} from 'react';
import {Link, connect} from 'umi';
import LoginForm from './components/Login';
import styles from './style.less';

const {Tab, UserName, Password, Mobile, Captcha, Submit} = LoginForm;

const LoginMessage = ({content}) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login = (props) => {
  const {userLogin = {}, submitting} = props;
  const {status, type: loginType} = userLogin;
  const [autoLogin, setAutoLogin] = useState(true);
  const [type, setType] = useState('account');

  const handleSubmit = (values) => {
    const {dispatch} = props;
    dispatch({
      type: 'login/login',
      payload: {...values},
    });
  };

  return (
    <div className={styles.main}>
      <LoginForm activeKey={type} onTabChange={setType} onSubmit={handleSubmit}>
        <UserName
          name="name"
          placeholder="请输入用户名"
          rules={[
            {
              required: true,
              message: '请输入用户名!',
            },
          ]}
        />
        <Password
          name="password"
          placeholder="请输入密码"
          rules={[
            {
              required: true,
              message: '请输入密码！',
            },
          ]}
        />
        <div>
          <Checkbox checked={autoLogin} onChange={(e) => setAutoLogin(e.target.checked)}>
            自动登录
          </Checkbox>
          <a style={{
              float: 'right', marginLeft: 8
            }}
          >
            忘记密码
          </a>
          <Link style={{
            float: 'right'
          }} className={styles.register} to="/user/register">
            注册账户
          </Link>
        </div>
        <Submit loading={submitting}>登录</Submit>
      </LoginForm>
    </div>
  );
};

export default connect(({login, loading}) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);
