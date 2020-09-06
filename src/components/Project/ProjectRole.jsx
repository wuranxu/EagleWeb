import React, {useEffect, useState} from 'react';
import {Avatar, List, Select, Skeleton, Tag, Button, Modal, Form} from 'antd';
import {connect, useParams} from 'umi';
import conf from '@/consts/const';
import {PlusOutlined} from '@ant-design/icons';
import CustomForm from "@/components/EagleForm/CustomForm";
import FormForModal from "@/components/EagleForm/FormForModal";
import getComponent from "@/components/EagleForm";

const FormItem = Form.Item;
const {Option} = Select;

const ProjectRole = ({data, user, dispatch, project, loading}) => {
  const params = useParams();

  const onFinish = (values) => {
    console.log(values);
  }

  useEffect(() => {
    dispatch({
      type: 'user/fetch'
    })
    dispatch({
      type: 'project/listProjectRole',
      payload: {
        projectId: params.id,
      }
    })
  }, [])

  const [modal, setModal] = useState(false);

  const {userMap, users} = user;


  const permission = (item) => {
    if (item.projRole === 'OWNER') {
      return null;
    }
    return <Select value={conf.PROJECT_ROLE_MAP[item.projRole]}>
      {
        Object.keys(conf.PROJECT_ROLE_MAP).map(key => <Option value={key}>{conf.PROJECT_ROLE_MAP[key]}</Option>)
      }
    </Select>
  }
  const opt = <Select placeholder="请选择用户">
    {
      users.map(item => <Option value={item.value}>{item.label}</Option>)
    }
  </Select>

  const role = <Select placeholder="请选择角色">
    {
      Object.keys(conf.PROJECT_ROLE_MAP).map(key => <Option value={key}>{conf.PROJECT_ROLE_MAP[key]}</Option>)
    }
  </Select>

  const fields = [
    {
      name: 'userId',
      label: '用户',
      required: true,
      component: opt,
      type: 'select'
    },
    {
      name: 'projectRole',
      label: '角色',
      required: true,
      component: role,
      type: 'select'
    },
  ]

  return (
    <div>
      <FormForModal title="添加成员" left={6} right={18} width={500} record={{}} onFinish={onFinish} fields={fields}
                    onCancel={() => setModal(false)} visible={modal}
      />
      <div style={{marginBottom: 16}}>
        <Button size="small" type="primary" onClick={() => setModal(true)}><PlusOutlined/>添加成员</Button>
      </div>
      <div>
        <List
          itemLayout="horizontal"
          size="small"
          dataSource={project.roles}
          loading={loading.effects['project/listProjectRole']}
          renderItem={item => (
            <List.Item actions={permission(item)}>
              <Skeleton avatar title={false} loading={item.loading} active>
                <List.Item.Meta
                  avatar={<Avatar
                    src={item.avatar || "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"}/>}
                  title={userMap[item.userId] ? userMap[item.userId].nickname : 'loading'}
                  description={userMap[item.userId] ? userMap[item.userId].email : 'loading'}/>
                <Tag color={conf.PROJECT_TAG[item.projRole]}>{conf.PROJECT_ROLE[item.projRole]}</Tag>
              </Skeleton>
            </List.Item>
          )}
        />
      </div>
    </div>
  )
}

export default connect(({project, user, loading}) => ({project, user, loading}))(ProjectRole);
