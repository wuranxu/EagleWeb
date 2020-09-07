import React, {useEffect, useState} from 'react';
import {Avatar, List, Select, Skeleton, Tag, Button, Modal, Form} from 'antd';
import {connect, useParams} from 'umi';
import conf from '@/consts/const';
import {PlusOutlined} from '@ant-design/icons';
import CustomForm from "@/components/EagleForm/CustomForm";
import FormForModal from "@/components/EagleForm/FormForModal";
import getComponent from "@/components/EagleForm";

const {Option} = Select;

const ProjectRole = ({user, dispatch, project, loading}) => {
  const params = useParams();
  const [modal, setModal] = useState(false);


  const onFinish = (values) => {
    const info = {
      ...values,
      projectId: params.id,
    }
    dispatch({
      type: 'project/addRole',
      payload: info,
    })
    setModal(false);
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


  const {userMap, users} = user;


  const permission = (item) => {
    if (item.projRole === 'OWNER') {
      return [<Tag color='blue'>组长</Tag>];
    }
    return [
      <Select style={{width: 80}} value={conf.PROJECT_ROLE_TO_ID[item.projRole]}>
        {
          Object.keys(conf.PROJECT_ROLE_MAP).map(key => <Option value={key}>{conf.PROJECT_ROLE_MAP[key]}</Option>)
        }
      </Select>
    ]
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
      name: 'projRole',
      label: '角色',
      required: true,
      component: role,
      type: 'select'
    },
  ]

  const data = [
    {
      userId: project.projectData.owner,
      projRole: 'OWNER',
    },
    ...project.roles,
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
          dataSource={data}
          loading={loading.effects['project/listProjectRole']}
          renderItem={item => (
            <List.Item actions={permission(item)}>
              <Skeleton avatar title={false} loading={item.loading} active>
                <List.Item.Meta
                  avatar={<Avatar
                    src={item.avatar || "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"}/>}
                  title={userMap[item.userId] ? userMap[item.userId].nickname : 'loading'}
                  description={userMap[item.userId] ? userMap[item.userId].email : 'loading'}/>
              </Skeleton>
            </List.Item>
          )}
        />
      </div>
    </div>
  )
}

export default connect(({project, user, loading}) => ({project, user, loading}))(ProjectRole);
