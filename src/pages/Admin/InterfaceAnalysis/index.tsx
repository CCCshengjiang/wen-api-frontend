import { invokeInterfaceTop } from '@/services/wen-api-backend/userInterfaceInfoController';
import { Pie } from '@ant-design/plots';
import { PageContainer } from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';

const InterfaceAnalysis: React.FC = () => {
  const [data, setData] = useState<API.InterfaceTopVO[]>([]);
  const [config, setConfig] = useState<any>(null);

  useEffect(() => {
    try {
      invokeInterfaceTop().then((res) => {
        console.log('res.data', res.data);
        if (res.data) {
          setData(res.data);
        }
      });
    } catch (error: any) {}
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const formatDataForPieChart = (data: API.InterfaceTopVO[]) => {
        return data.map((item) => ({
          type: item.interfaceName,
          value: item.invokeNum,
        }));
      };

      const updatedConfig = {
        data: formatDataForPieChart(data),
        angleField: 'value',
        colorField: 'type',
        label: {
          text: 'type',
          style: {
            fontWeight: 'bold',
          },
        },
        legend: {
          color: {
            title: false,
            position: 'right',
            rowPadding: 5,
          },
        },
      };

      setConfig(updatedConfig);
    }
  }, [data]);

  return (
    <PageContainer>
      <div
        style={{
          fontSize: '20px',

          fontWeight: 'bold',
        }}
      >
        <h3>接口调用情况分析（饼状图）</h3>
      </div>
      {config && <Pie {...config} />}
    </PageContainer>
  );
};

export default InterfaceAnalysis;
