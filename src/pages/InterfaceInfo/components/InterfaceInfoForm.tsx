import { Badge, Descriptions, Divider } from 'antd';
import moment from 'moment';
import React from 'react';

interface InterfaceInfoDisplayProps {
  interfaceData: API.InterfaceInfo | undefined; // 显式定义 interfaceData 的类型
}

const InterfaceInfoDisplay: React.FC<InterfaceInfoDisplayProps> = ({ interfaceData }) => {
  const items = [
    {
      key: 'name',
      label: '接口名称',
      children: `${interfaceData?.interfaceName}`,
    },
    {
      key: 'description',
      label: '接口描述',
      children: `${interfaceData?.interfaceDescription}`,
    },
    {
      key: 'url',
      label: '接口地址',
      children: `${interfaceData?.interfaceUrl}`,
    },
    {
      key: 'method',
      label: '接口类型',
      children: `${interfaceData?.interfaceMethod}`,
    },
    {
      key: 'createTime',
      label: '创建时间',
      children: moment(interfaceData?.createTime).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      key: 'requestParams',
      label: '请求参数',
      children: `${interfaceData?.requestParams}`,
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
    <>
      <Descriptions
        title="查看接口信息"
        bordered
        items={items}
        column={2}
        labelStyle={{ padding: '15px 2px', textAlign: 'center' }}
        contentStyle={{ padding: '15px 10px', textAlign: 'left' }}
      />
      <Divider />
    </>
  );
};

export default InterfaceInfoDisplay;
