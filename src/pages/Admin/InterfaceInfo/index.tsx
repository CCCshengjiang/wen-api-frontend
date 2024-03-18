import { rule } from '@/services/ant-design-pro/api';
import {
  deleteInterface,
  offlineInterface,
  onlineInterface,
  updateInterface,
} from '@/services/wen-api-backend/interfaceInfoController';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import { PageContainer, ProDescriptions, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { Button, Drawer, message } from 'antd';
import React, { useRef, useState } from 'react';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';

/**
 * @en-US Update node
 * @zh-CN 修改接口
 * @param fields
 * @param id
 */
const interfaceUpdate = async (fields: FormValueType, id: number) => {
  const hide = message.loading('正在修改接口信息');
  try {
    await updateInterface({
      id: id,
      ...fields,
    });
    hide();
    message.success('接口信息修改成功');
    return true;
  } catch (error: any) {
    hide();
    message.error('接口信息修改失败：' + error.message);
    return false;
  }
};

/**
 * 删除单个接口
 * @param interfaceId
 * @constructor
 */
const InterfaceDelete = async (interfaceId: API.DeleteRequest) => {
  const hide = message.loading('正在删除接口');
  if (!interfaceId) return true;
  try {
    await deleteInterface({
      id: interfaceId.id,
    });
    hide();
    message.success('删除接口成功');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试！');
    return false;
  }
};

/**
 * 发布接口
 * @param interfaceId
 * @constructor
 */
const InterfaceOnline = async (interfaceId: API.IdRequest) => {
  const hide = message.loading('正在发布接口');
  if (!interfaceId) return true;
  try {
    await onlineInterface({
      id: interfaceId.id,
    });
    hide();
    message.success('接口发布成功');
    return true;
  } catch (error: any) {
    hide();
    message.error('发布失败:' + error.message);
    return false;
  }
};

/**
 * 下线接口
 * @param interfaceId
 * @constructor
 */
const InterfaceOffline = async (interfaceId: API.IdRequest) => {
  const hide = message.loading('正在下线接口');
  if (!interfaceId) return true;
  try {
    await offlineInterface({
      id: interfaceId.id,
    });
    hide();
    message.success('接口下线成功');
    return true;
  } catch (error: any) {
    hide();
    message.error('下线失败:' + error.message);
    return false;
  }
};

const InterfaceList: React.FC = () => {
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.InterfaceInfo>();

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */

  const columns: ProColumns<API.InterfaceInfo>[] = [
    {
      title: '编号',
      dataIndex: 'id',
      valueType: 'indexBorder',
      fixed: 'left',
      width: 50, // 推荐为固定列指定宽度
    },
    {
      title: '接口名',
      dataIndex: 'interfaceName',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
      valueType: 'text',
      fixed: 'left',
      width: 150, // 推荐为固定列指定宽度
    },
    {
      title: '接口描述',
      dataIndex: 'interfaceDescription',
      valueType: 'textarea',
    },
    {
      title: '接口类型',
      dataIndex: 'interfaceMethod',
      valueType: 'text',
    },
    {
      title: '接口地址',
      dataIndex: 'interfaceUrl',
      valueType: 'text',
    },
    {
      title: '创建人 ID',
      dataIndex: 'userId',
      valueType: 'text',
    },
    {
      title: '请求参数',
      dataIndex: 'requestParams',
      valueType: 'jsonCode',
      hideInTable: true, // 默认不展示在表格中
    },
    {
      title: '接口状态',
      dataIndex: 'interfaceStatus',
      hideInForm: true,
      valueEnum: {
        // 上线
        0: {
          text: '已上线',
          status: 'Success',
        },
        // 下线
        1: {
          text: '下线',
          status: 'Default',
        },
        /* // 运行
        2: {
          text: '运行中',
          status: 'Processing',
        },*/
        /*        // 已下线
        3: {
          text: '已下线',
          status: 'Error',
        },*/
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      valueType: 'dateTime',
    },
    // 操作
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="update"
          onClick={() => {
            handleUpdateModalOpen(true);
            setCurrentRow(record);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }}
        >
          修改
        </a>,
        record.interfaceStatus === 1 ? (
          <a
            key="online"
            onClick={async () => {
              await InterfaceOnline(record);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }}
            style={{
              color: '#3CB371',
            }}
          >
            发布
          </a>
        ) : null,
        record.interfaceStatus === 0 ? (
          <a
            key="offline"
            onClick={async () => {
              await InterfaceOffline(record);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }}
            style={{
              color: 'rgba(255, 0, 0, 0.5)',
            }}
          >
            下线
          </a>
        ) : null,
        <Button
          key="delete"
          type="text"
          danger
          onClick={async () => {
            await InterfaceDelete(record);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }}
        >
          删除
        </Button>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.InterfaceInfo, API.PageParams>
        headerTitle={'接口表格'}
        actionRef={actionRef}
        scroll={{ x: 'max-content' }} // 根据内容自动调整宽度，需要时显示滚动条
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        request={rule}
        columns={columns}
        pagination={{
          pageSize: 10, // 每页显示条数
          showQuickJumper: false, // 是否可以快速跳转至某页
          showSizeChanger: false, // 是否可以改变每页显示条数
        }}
      />
      <UpdateForm
        onSubmit={async (value) => {
          const success = await interfaceUpdate(value, currentRow?.id as number);
          if (success) {
            console.log('提交成功');
            handleUpdateModalOpen(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalOpen(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        updateModalOpen={updateModalOpen}
        values={currentRow || {}}
      />
      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.interfaceName && (
          <ProDescriptions<API.InterfaceInfo>
            column={1}
            title={currentRow?.interfaceName}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.id,
            }}
            columns={columns as ProDescriptionsItemProps<API.InterfaceInfo>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};
export default InterfaceList;
