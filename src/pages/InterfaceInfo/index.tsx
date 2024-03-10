import { removeRule, rule } from '@/services/ant-design-pro/api';
import {
  addInterface,
  deleteInterface,
  updateInterface,
} from '@/services/wen-api-backend/interfaceInfoController';
import { getCurrentUser } from '@/services/wen-api-backend/userController';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
  FooterToolbar,
  ModalForm,
  PageContainer,
  ProDescriptions,
  ProFormText,
  ProFormTextArea,
  ProTable,
} from '@ant-design/pro-components';
import '@umijs/max';
import { Button, Drawer, message } from 'antd';
import React, { useRef, useState } from 'react';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';

/**
 * 得到当前用户的信息
 */
const currentUser = await getCurrentUser();

/**
 * @en-US Add node
 * @zh-CN 新增接口
 * @param createInfo
 */
const interfaceAdd = async (createInfo: API.InterfaceAddRequest) => {
  const hide = message.loading('正在添加');
  try {
    createInfo.userId = currentUser.data?.id;
    await addInterface({
      ...createInfo,
    });
    hide();
    message.success('接口添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败，请重试！');
    return false;
  }
};

/**
 * @en-US Update node
 * @zh-CN 修改接口
 * @param fields
 */
const interfaceUpdate = async (fields: FormValueType) => {
  const hide = message.loading('正在修改接口信息');
  try {
    await updateInterface({
      ...fields,
    });
    hide();
    message.success('接口信息修改成功');
    return true;
  } catch (error) {
    hide();
    message.error('接口信息修改失败，请重试');
    return false;
  }
};

/**
 *  Delete node
 * @zh-CN 删除接口
 * @param selectedRows
 * todo 删除多个接口实现，后端要接收接口的 id 列表
 */
const handleRemove = async (selectedRows: API.InterfaceInfo[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeRule({
      key: selectedRows.map((row) => row.id),
    });
    hide();
    message.success('Deleted successfully and will refresh soon');
    return true;
  } catch (error) {
    hide();
    message.error('Delete failed, please try again');
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
const InterfaceList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.InterfaceInfo>();
  const [selectedRowsState, setSelectedRows] = useState<API.InterfaceInfo[]>([]);

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */

  const columns: ProColumns<API.InterfaceInfo>[] = [
    {
      title: '编号',
      dataIndex: 'id',
      valueType: 'index',
    },
    {
      title: '接口名',
      dataIndex: 'name',
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
    },
    {
      title: '接口描述',
      dataIndex: 'description',
      valueType: 'textarea',
    },
    // 服务调用次数
    /*    {
      title: (
        <FormattedMessage
          id="pages.searchTable.titleCallNo"
          defaultMessage="Number of service calls"
        />
      ),
      dataIndex: 'callNo',
      sorter: true,
      hideInForm: true,
      renderText: (val: string) =>
        `${val}${intl.formatMessage({
          id: 'pages.searchTable.tenThousand',
          defaultMessage: ' 万 ',
        })}`,
    },*/
    {
      title: '接口类型',
      dataIndex: 'method',
      valueType: 'text',
    },
    {
      title: '接口地址',
      dataIndex: 'url',
      valueType: 'text',
    },
    {
      title: '创建人',
      dataIndex: 'userId',
      valueType: 'text',
    },
    {
      title: '请求头',
      dataIndex: 'requestHeader',
      valueType: 'textarea',
    },
    {
      title: '响应头',
      dataIndex: 'responseHeader',
      valueType: 'textarea',
    },
    {
      title: '接口状态',
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        // 关闭
        2: {
          text: '关闭',
          status: 'Default',
        },
        // 运行
        3: {
          text: '运行中',
          status: 'Processing',
        },
        // 上线
        0: {
          text: '已上线',
          status: 'Success',
        },
        // 异常
        1: {
          text: '异常',
          status: 'Error',
        },
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
    // 上次调度时间
    /*{
  title: (
    <FormattedMessage
      id="pages.searchTable.titleUpdatedAt"
      defaultMessage="Last scheduled time"
    />
  ),
  sorter: true,
  dataIndex: 'updatedAt',
  valueType: 'dateTime',
  renderFormItem: (item, { defaultRender, ...rest }, form) => {
    const status = form.getFieldValue('status');
    if (`${status}` === '0') {
      return false;
    }
    if (`${status}` === '3') {
      return (
        <Input
          {...rest}
          placeholder={intl.formatMessage({
            id: 'pages.searchTable.exception',
            defaultMessage: 'Please enter the reason for the exception!',
          })}
        />
      );
    }
    return defaultRender(item);
  },
  },*/
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
        <a
          key="delete"
          onClick={async () => {
            await InterfaceDelete(record);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }}
          style={{
            color: 'rgba(255, 0, 0, 0.7)',
          }}
        >
          删除
        </a>,
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.InterfaceInfo, API.PageParams>
        headerTitle={'查询表格'}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalOpen(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={rule}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              项 &nbsp;&nbsp;
              <span>
                服务调用次数总计 TODO // item.id 是接口的调用次数(为了不报错，写的 id)
                {selectedRowsState.reduce((pre, item) => pre + item.id!, 0)} 万
              </span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
          <Button type="primary">批量审批</Button>
        </FooterToolbar>
      )}
      <ModalForm
        title={'创建接口'}
        width="400px"
        open={createModalOpen}
        onOpenChange={handleModalOpen}
        onFinish={async (createInfo) => {
          const success = await interfaceAdd(createInfo as API.InterfaceAddRequest);
          if (success) {
            handleModalOpen(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText // 新增接口的提交表单
          rules={[
            {
              required: true,
              message: '请输入接口名称',
            },
          ]}
          label="接口名称"
          width="md"
          name="name"
        />
        <ProFormText
          rules={[
            {
              required: true,
              message: '请输入接口类型',
            },
          ]}
          label="接口类型"
          width="md"
          name="method"
        />
        <ProFormTextArea
          rules={[
            {
              required: false,
              message: '请输入接口描述',
            },
          ]}
          label="接口描述"
          width="md"
          name="description"
        />
        <ProFormTextArea
          rules={[
            {
              required: true,
              message: '请输入接口地址',
            },
          ]}
          label="接口地址"
          width="md"
          name="url"
        />
        <ProFormTextArea
          rules={[
            {
              required: true,
              message: '请输入接口请求头',
            },
          ]}
          label="请求头"
          width="md"
          name="requestHeader"
        />
        <ProFormTextArea
          rules={[
            {
              required: true,
              message: '请输入接口响应头',
            },
          ]}
          label="响应头"
          width="md"
          name="responseHeader"
        />
      </ModalForm>
      <UpdateForm
        onSubmit={async (value) => {
          const success = await interfaceUpdate(value);
          if (success) {
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
        {currentRow?.name && (
          <ProDescriptions<API.InterfaceInfo>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<API.InterfaceInfo>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};
export default InterfaceList;
