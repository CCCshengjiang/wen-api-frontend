import {
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { Button, Form, Modal } from 'antd';
import React, { useEffect } from 'react';

export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<API.InterfaceUpdateRequest>;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalOpen: boolean;
  values: Partial<API.InterfaceInfo>;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  console.log('id:', props.values.id);

  const [form] = Form.useForm();

  useEffect(() => {
    // 每当props.values变化时，更新表单的值
    form.setFieldsValue({
      interfaceDescription: props.values.interfaceDescription,
      interfaceName: props.values.interfaceName,
      interfaceMethod: props.values.interfaceMethod,
      interfaceUrl: props.values.interfaceUrl,
      interfaceStatus: props.values.interfaceStatus,
      requestHeader: props.values.requestHeader,
      responseHeader: props.values.responseHeader,
      id: props.values.id,
    });
  }, [props.values]); // 依赖项是props.values，这样只有当它变化时才会执行
  return (
    <Modal
      width={640}
      style={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title="修改接口信息"
      open={props.updateModalOpen}
      footer={null}
      onCancel={() => {
        props.onCancel();
      }}
    >
      <Form form={form} onFinish={props.onSubmit}>
        <Form.Item name="id" style={{ display: 'none' }}>
          <input type="hidden" value={props.values.id} />
        </Form.Item>
        <ProFormText
          name="interfaceName"
          label="接口名称"
          width="md"
          rules={[
            {
              required: true,
              message: '请输入接口名称！',
            },
          ]}
        />
        <ProFormSelect
          name="interfaceMethod"
          width="md"
          label="接口类型"
          valueEnum={{
            0: 'POST',
            1: 'GET',
          }}
          rules={[
            {
              required: true,
              message: '请选择接口类型！',
            },
          ]}
        />
        <ProFormTextArea
          name="interfaceUrl"
          width="md"
          label="接口地址"
          rules={[
            {
              required: true,
              message: '请输入接口地址！',
            },
          ]}
        />
        <ProFormTextArea
          name="requestParams"
          width="md"
          label="请求请求参数"
          rules={[
            {
              required: true,
              message: '请填写接口请求头！',
            },
          ]}
        />
        <ProFormTextArea
          name="requestHeader"
          width="md"
          label="请求头"
          rules={[
            {
              required: true,
              message: '请填写接口请求头！',
            },
          ]}
        />
        <ProFormTextArea
          name="responseHeader"
          width="md"
          label="响应头"
          rules={[
            {
              required: true,
              message: '请填写接口响应头！',
            },
          ]}
        />
        <ProFormTextArea name="interfaceDescription" width="md" label="接口描述" />
        <ProFormRadio.Group
          name="interfaceStatus"
          label="接口状态"
          options={[
            {
              value: 0,
              label: '已上线',
            },
            {
              value: 1,
              label: '已关闭',
            },
          ]}
          rules={[
            {
              required: true,
              message: '请选择接口状态！',
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
