import { ProFormSelect, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
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
      requestParams: props.values.requestParams,
      requestHeader: props.values.requestHeader,
      responseHeader: props.values.responseHeader,
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
        <ProFormTextArea name="requestParams" width="md" label="请求参数" />
        <ProFormTextArea name="interfaceDescription" width="md" label="接口描述" />
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
