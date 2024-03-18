import InterfaceInfoDisplay from '@/pages/InterfaceInfo/components/InterfaceInfoForm';
import {
  invokeInterface,
  searchInterfaceById,
} from '@/services/wen-api-backend/interfaceInfoController';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Divider, Form, Input, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const { Search } = Input;

const Index: React.FC = () => {
  const [interfaceData, setInterfaceData] = useState<API.InterfaceInfo>();
  const [invokeRes, setInvokeRes] = useState<any>();
  const [invokeLoading, setInvokeLoading] = useState<boolean>(false);
  const [userInputValue, setUserInputValue] = useState<string>(''); // 保存用户输入的值

  const params = useParams();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInputValue(e.target.value);
  };

  const loadData = async () => {
    try {
      const res = await searchInterfaceById({
        idRequest: params,
      });
      setInterfaceData(res?.data);
    } catch (error: any) {
      message.error('接口查询失败:' + error.message);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const onFinish = async () => {
    if (!params.id) {
      message.error('接口不存在');
      return;
    }
    setInvokeLoading(true);
    console.log('userInputValue', userInputValue);
    try {
      const res = await invokeInterface({
        id: Number(params.id),
        interfaceUrl: interfaceData?.interfaceUrl,
        interfaceMethod: interfaceData?.interfaceMethod,
        userRequestParams: userInputValue,
      });
      setInvokeRes(res.data);
      message.success('请求成功');
    } catch (error: any) {
      message.error('操作失败：' + error.message);
    }
    setInvokeLoading(false);
  };

  console.log('interfaceData.requestParams:', interfaceData?.requestParams);

  const paramsArray = interfaceData?.requestParams?.split(',');

  return (
    <PageContainer>
      <Card>
        <InterfaceInfoDisplay interfaceData={interfaceData} /> {/* 使用通用组件 */}
      </Card>
      <Divider />
      <Card title="在线调试">
        <div style={{ display: 'flex', justifyContent: 'center', justifyItems: 'center' }}>
          <Search
            size={'large'}
            readOnly
            style={{ maxWidth: 600 }}
            value={interfaceData?.interfaceUrl}
            addonBefore={interfaceData?.interfaceMethod}
            enterButton="发起请求"
            onSearch={onFinish}
          />
        </div>
        <Divider />
        {paramsArray && paramsArray.length > 0 && (
          <>
            <p className="highlightLine" style={{ marginTop: 25 }}>
              请求参数设置：
            </p>
            {paramsArray.map((param, index) => (
              <div key={index}>
                <Input
                  name={param}
                  addonBefore={param}
                  placeholder="参数值"
                  allowClear
                  style={{ width: 304 }}
                  onChange={handleInputChange} // 监听用户输入并更新 userInputValue
                />
                {index < paramsArray.length - 1 && <Divider />}
              </div>
            ))}
          </>
        )}
      </Card>
      <Divider />
      <Card title="返回结果" loading={invokeLoading}>
        <Form.Item shouldUpdate>
          {() => {
            return <pre>{JSON.stringify(invokeRes, null, 2)}</pre>;
          }}
        </Form.Item>
      </Card>
    </PageContainer>
  );
};

export default Index;
