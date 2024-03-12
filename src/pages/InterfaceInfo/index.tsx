import { searchInterfaceById } from '@/services/wen-api-backend/interfaceInfoController';
import { PageContainer } from '@ant-design/pro-components';
import { Badge, Card, Descriptions, DescriptionsProps, message } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const Index: React.FC = () => {
  const [interfaceData, setInterfaceData] = useState<API.InterfaceInfo>();

  const params = useParams();
  const loadData = async () => {
    try {
      const res = await searchInterfaceById({
        idRequest: params,
      });
      setInterfaceData(res?.data);
    } catch (error) {
      message.error('接口查询失败');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const items: DescriptionsProps['items'] = [
    {
      key: 'name',
      label: '接口名称',
      children: `${interfaceData?.interfaceName}`,
    },
    {
      key: 'userId',
      label: '创建人',
      children: `${interfaceData?.userId}`,
    },
    {
      key: 'method',
      label: '接口类型',
      children: `${interfaceData?.interfaceMethod}`,
    },

    {
      key: 'url',
      label: '接口地址',
      children: `${interfaceData?.interfaceUrl}`,
    },
    {
      key: 'description',
      label: '接口描述',
      children: `${interfaceData?.interfaceDescription}`,
    },
    {
      key: 'requestParams',
      label: '请求参数',
      children: `${interfaceData?.requestParams}`,
    },
    {
      key: 'requestHeader',
      label: '请求头',
      children: `${interfaceData?.requestHeader}`,
    },
    {
      key: 'responseHeader',
      label: '响应头',
      children: `${interfaceData?.responseHeader}`,
    },
    {
      key: 'createTime',
      label: '创建时间',
      children: moment(interfaceData?.createTime).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      key: 'updateTime',
      label: '更新时间',
      children: moment(interfaceData?.updateTime).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      key: 'status',
      label: '接口状态',
      children:
        interfaceData?.interfaceStatus === 0 ? (
          <Badge status="success" text="已发布" />
        ) : interfaceData?.interfaceStatus === 1 ? (
          <Badge status="error" text="已下线" />
        ) : (
          <Badge status="default" text="未知" />
        ), // 可以添加一个默认状态以处理意外情况
    },
  ];

  return (
    <PageContainer>
      <Card>
        <Descriptions
          title="查看接口信息"
          bordered
          items={items}
          column={1}
          labelStyle={{ padding: '15px 2px', textAlign: 'center' }} // 调整标签样式，减少内边距并右对齐
          contentStyle={{ padding: '15px 10px', textAlign: 'left' }} // 调整内容样式，减少内边距并左对齐
        />
      </Card>
    </PageContainer>
  );
};

export default Index;
