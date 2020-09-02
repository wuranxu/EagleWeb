import React, {PureComponent} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import {Avatar, Card, List, Upload} from "antd";
import {connect} from "@/.umi/plugin-dva/exports";
import conf from '@/consts/const';

@connect(({project, loading}) => ({
  project, loading
}))
export default class Project extends PureComponent {

  state = {
    key: 0,
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'project/fetch',
      payload: {page: 1, size: 1000}
    })
  }

  render() {
    const {data} = this.props.project;
    const actions = [
      <a href="">编辑</a>,
      <a href="" style={{marginLeft: 8}}>删除</a>
    ]

    return (
      <PageContainer title="项目管理">
        <Card>
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={item => (
              <List.Item actions={actions}>
                <List.Item.Meta
                  avatar={
                    <Upload customRequest={async fileData => {
                      const key = this.state.key;
                      await this.props.dispatch({
                        type: 'project/uploadFile',
                        payload: {
                          file: fileData.file,
                          project_id: item.id,
                        }
                      })
                      setTimeout(() => {
                        this.setState({key: key+1})
                      }, 2000);
                    }} fileList={[]}>
                      <Avatar size="large" key={this.state.key} src={`${conf.PIC_URL}${item.id}`}/>
                    </Upload>}
                  title={item.projectName}
                  description={item.description}
                />
              </List.Item>
            )}
          />
        </Card>
      </PageContainer>
    )
  }
}
