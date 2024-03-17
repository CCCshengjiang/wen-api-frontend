import { FormValueType } from '@/pages/Admin/User/components/UpdateForm';
import { userUpdate } from '@/services/wen-api-backend/userController';
import { Button, Col, Form, Input, Row, Select, message } from 'antd';
import React from 'react';

interface EditFormProps {
  currentUser: API.SafetyUserVO | undefined;
  onCancel: () => void;
}

const UserInfoUpdate = async (fields: FormValueType, id: number) => {
  try {
    await userUpdate({
      id: id,
      ...fields,
    });
    message.success('用户信息修改成功');
    return true;
  } catch (error: any) {
    message.error('用户信息修改失败：' + error.message);
    return false;
  }
};

const EditForm: React.FC<EditFormProps> = ({ currentUser, onCancel }) => {
  const [form] = Form.useForm();
  const handleFinish = async (values: any) => {
    const success = await UserInfoUpdate(values, currentUser?.id as number);
    if (success) {
      console.log('提交成功');
      onCancel(); // 提交成功后调用取消操作回调函数，关闭表单
    }
  };

  return (
    <Form form={form} onFinish={handleFinish} initialValues={currentUser} layout="vertical">
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="username" label="用户名">
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="avatarUrl" label="头像链接">
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="gender" label="性别">
            <Select>
              <Select.Option value={0}>女</Select.Option>
              <Select.Option value={1}>男</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="userAccount" label="用户账号">
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="phone" label="电话">
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="email" label="邮箱">
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          保存
        </Button>
        <Button onClick={onCancel}>取消</Button>
      </Form.Item>
    </Form>
  );
};

export default EditForm;
