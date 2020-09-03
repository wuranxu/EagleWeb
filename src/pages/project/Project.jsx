import React, {PureComponent} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import {Spin, Empty, Avatar, Card, Tooltip, Upload, Row, Input, Col, Button, Select} from "antd";
import {connect} from "@/.umi/plugin-dva/exports";
import conf from '@/consts/const';
import {QuestionCircleOutlined} from '@ant-design/icons';
import FormForModal from "@/components/ModalForm/FormForModal";

const {Search} = Input;
const {Option} = Select;

@connect(({project, loading, user}) => ({
  project, loading, user
}))
export default class Project extends PureComponent {

  async componentDidMount() {
    await this.props.dispatch({
      type: 'user/fetch'
    })
    await this.props.dispatch({
      type: 'project/fetch',
      payload: {page: 1, size: 1000}
    })
  }

  onSearchProject = projectName => {
    this.props.dispatch({
      type: 'project/fetch',
      payload: {page: 1, size: 1000, projectName}
    })
  }

  onHandleModal = status => {
    this.props.dispatch({
      type: 'project/save',
      payload: {visible: status}
    })
  }

  onHandleCreate = values => {
    this.props.dispatch({
      type: 'project/insert',
      payload: values,
    })
  }

  render() {
    const {data, visible} = this.props.project;
    const {users} = this.props.user;
    const {loading} = this.props;
    const opt = <Select placeholder="请选择项目组长">
      {
        users.map(item => <Option value={item.value}>{item.label}</Option>)
      }
    </Select>
    const fields = [
      {
        name: 'projectName',
        label: '项目名称',
        required: true,
        message: "请输入项目名称",
        type: 'input',
        placeholder: "请输入项目名称",
      },
      {
        name: 'gitlabUrl',
        label: 'gitlab ID',
        required: true,
        message: "请输入gitlab项目id, 如有多个用,隔开",
        type: 'input',
        placeholder: "请输入gitlab项目id",
      },
      {
        name: 'owner',
        label: '项目组长',
        required: true,
        component: opt,
        type: 'select',
      },
      {
        name: 'description',
        label: '项目描述',
        required: false,
        message: "请输入项目描述",
        type: 'textarea',
        placeholder: "请输入项目描述",
      },
    ]
    return (
      <PageContainer title={false}>
        <FormForModal width={600} title="添加项目" left={6} right={18} record={{}}
                      visible={visible} onCancel={() => {
          this.onHandleModal(false)
        }} fields={fields} onFinish={this.onHandleCreate}
        />
        <Row gutter={8} style={{marginBottom: 16}}>
          <Col span={18}>
            <Button type="primary" onClick={() => {
              this.onHandleModal(true)
            }}>创建项目
              <Tooltip title="只有超级管理员可以创建项目"><QuestionCircleOutlined/></Tooltip>
            </Button>
          </Col>
          <Col span={6}>
            <Search onSearch={this.onSearchProject} style={{float: 'right'}} placeholder="请输入项目名称"/>
          </Col>
        </Row>
        <Spin spinning={loading.effects['project/fetch']}>
          <Row gutter={16}>
            {
              data.length === 0 ? <Col span={24} style={{textAlign: 'center'}}>
                  <Card><Empty description="暂无项目, 快点击『创建项目』创建一个吧!"/></Card>
                </Col> :
                data.map(item =>
                  <Col span={4}>
                    <Card hoverable bordered={false} style={{borderRadius: 16, textAlign: 'center'}}
                          bodyStyle={{padding: 16}}>
                      <Tooltip title="点击可修改头像">
                        <Upload customRequest={async fileData => {
                          await this.props.dispatch({
                            type: 'project/uploadFile',
                            payload: {
                              file: fileData.file,
                              project_id: item.id,
                            }
                          })
                        }} fileList={[]}>
                          <Avatar size={100} src={`${conf.PIC_URL}${item.avatar}`}/>
                        </Upload>
                      </Tooltip>
                      <p style={{
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: 18,
                        marginTop: 6
                      }}>{item.projectName}</p>
                      <p style={{textAlign: 'center', fontSize: 12}}>更新于 <span
                        style={{color: '#409EFF'}}>{item.updateTime.split(" ")[1]}</span></p>
                    </Card>
                  </Col>
                )
            }
          </Row>
        </Spin>
      </PageContainer>
    )
  }
}
