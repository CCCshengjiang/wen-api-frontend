import { ProFormSelect, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { Button, Form, Modal } from 'antd';
import React, { useEffect } from 'react';

export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<API.UserUpdateRequest>;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalOpen: boolean;
  values: Partial<API.SafetyUserVO>;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const [form] = Form.useForm();

  useEffect(() => {
    // 每当props.values变化时，更新表单的值
    form.setFieldsValue({
      username: props.values.username,
      gender: props.values.gender === 0 ? '女' : '男',
      avatarUrl: props.values.avatarUrl,
      phone: props.values.phone,
      email: props.values.email,
      userRole: props.values.userRole,
      status: props.values.userStatus === 0 ? '正常' : '异常',
    });
  }, [props.values]); // 依赖项是props.values，这样只有当它变化时才会执行
  return (
    <Modal
      width={640}
      style={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title="修改用户信息"
      open={props.updateModalOpen}
      footer={null}
      onCancel={() => {
        props.onCancel();
      }}
    >
      <Form form={form} onFinish={props.onSubmit}>
        <ProFormText
          name="username"
          label="用户名称"
          width="md"
          rules={[
            {
              required: true,
              message: '请输入用户名称！',
            },
          ]}
        />
        <ProFormSelect
          name="gender"
          width="md"
          label="性别"
          valueEnum={{
            0: '女',
            1: '男',
          }}
          rules={[
            {
              required: true,
              message: '请选择用户性别！',
            },
          ]}
        />
        <ProFormSelect
          name="userRole"
          width="md"
          label="用户角色"
          valueEnum={{
            0: '普通用户',
            1: '管理员',
          }}
          rules={[
            {
              required: true,
              message: '请选择用户角色！',
            },
          ]}
        />
        <ProFormSelect
          name="status"
          width="md"
          label="用户状态"
          valueEnum={{
            0: '正常',
            1: '异常',
          }}
          rules={[
            {
              required: true,
              message: '请选择用户状态！',
            },
          ]}
        />
        <ProFormText
          name="phone"
          width="md"
          label="手机号"
          rules={[
            {
              required: true,
              message: '请填写手机号！',
            },
          ]}
        />
        <ProFormText
          name="email"
          width="md"
          label="邮箱"
          rules={[
            {
              required: true,
              message: '请填写邮箱！',
            },
          ]}
        />
        <ProFormTextArea
          name="avatarUrl"
          width="md"
          label="头像地址"
          rules={[
            {
              required: true,
              message: '请输入头像地址！',
            },
          ]}
        />
        <Form.Item wrapperCol={{ offset: 8 }}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateForm;
