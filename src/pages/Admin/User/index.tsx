import { userRule } from '@/services/ant-design-pro/api';
import { userDelete, userUpdate } from '@/services/wen-api-backend/userController';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import { PageContainer, ProDescriptions, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { undefined } from '@umijs/utils/compiled/zod';
import { Button, Drawer, message } from 'antd';
import React, { useRef, useState } from 'react';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';

/**
 * @en-US Update node
 * @zh-CN 修改用户信息
 * @param fields
 * @param id
 */
const UserUpdate = async (fields: FormValueType, id: number) => {
  const hide = message.loading('正在修改接口信息');
  try {
    await userUpdate({
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
 * 删除单个用户
 * @param userId
 * @constructor
 */
const UserDelete = async (userId: API.DeleteRequest) => {
  const hide = message.loading('正在删除接口');
  if (!userId) return true;
  try {
    await userDelete({
      deleteRequest: { id: userId.id },
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

const UserList: React.FC = () => {
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.SafetyUserVO>();

  const columns: ProColumns<API.SafetyUserVO>[] = [
    {
      title: '编号',
      dataIndex: 'id',
      valueType: 'index',
      fixed: 'left',
      width: 50, // 推荐为固定列指定宽度
    },
    {
      title: '用户名',
      dataIndex: 'username',
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
      title: '用户头像',
      dataIndex: 'avatarUrl',
      valueType: 'image',
    },
    {
      title: '性别',
      dataIndex: 'gender',
      valueType: 'text',
      valueEnum: {
        // 普通用户
        0: {
          text: '女',
        },
        // 管理员用户
        1: {
          text: '男',
        },
      },
    },
    {
      title: '账号',
      dataIndex: 'userAccount',
      valueType: 'text',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      valueType: 'text',
    },
    {
      title: '邮件',
      dataIndex: 'email',
      valueType: 'text',
    },
    {
      title: '用户角色',
      dataIndex: 'userRole',
      valueType: 'text',
      valueEnum: {
        // 普通用户
        0: {
          text: '普通用户',
          status: 'default',
        },
        // 管理员用户
        1: {
          text: '管理员',
          status: 'Success',
        },
      },
    },
    {
      title: '用户状态',
      dataIndex: 'userStatus',
      valueType: 'text',
      valueEnum: {
        // 正常账号
        0: {
          text: '正常',
          status: 'Processing',
        },
        // 账号状态异常
        1: {
          text: '异常',
          status: 'error',
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
        <Button
          key="delete"
          type="text"
          danger
          onClick={async () => {
            await UserDelete(record);
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
      <ProTable<API.SafetyUserVO, API.PageParams>
        headerTitle={'用户表格'}
        actionRef={actionRef}
        scroll={{ x: 'max-content' }} // 根据内容自动调整宽度，需要时显示滚动条
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        request={userRule}
        columns={columns}
        pagination={{
          pageSize: 10, // 每页显示条数
          showQuickJumper: false, // 是否可以快速跳转至某页
          showSizeChanger: false, // 是否可以改变每页显示条数
        }}
      />
      <UpdateForm
        onSubmit={async (value) => {
          const success = await UserUpdate(value, currentRow?.id as number);
          if (success) {
            console.log('提交成功');
            handleUpdateModalOpen(false);
            // @ts-ignore
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalOpen(false);
          if (!showDetail) {
            // @ts-ignore
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
          // @ts-ignore
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.username && (
          <ProDescriptions<API.SafetyUserVO>
            column={1}
            title={currentRow?.username}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.id,
            }}
            columns={columns as ProDescriptionsItemProps<API.SafetyUserVO>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};
export default UserList;
