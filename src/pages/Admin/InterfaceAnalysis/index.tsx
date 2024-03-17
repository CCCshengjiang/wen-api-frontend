import { PageContainer } from '@ant-design/pro-components';
import '@umijs/max';
import React, { useEffect, useState } from 'react';

import { invokeInterfaceTop } from '@/services/wen-api-backend/interfaceInfoController';
import { Pie } from '@ant-design/plots';

const InterfaceAnalysis: React.FC = () => {
  const [data, setData] = useState<API.InterfaceInfo[]>([]);

  useEffect(() => {
    try {
      invokeInterfaceTop().then((res) => {
        console.log('res', res);
        console.log('res.data', res.data);
        if (res.data) {
          setData(res.data);
        }
      });
    } catch (error: any) {}
  }, []);

  const charData = data.map((item) => {
    return {
      type: item.interfaceName,
      value: 10,
    };
  });

  const config = {
    data: charData,
    angleField: 'value',
    colorField: 'type',
    paddingRight: 80,
    innerRadius: 0.6,
    label: {
      text: 'value',
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
    annotations: [
      {
        type: 'text',
        style: {
          text: 'AntV\nCharts',
          x: '50%',
          y: '50%',
          textAlign: 'center',
          fontSize: 40,
          fontStyle: 'bold',
        },
      },
    ],
  };

  return (
    <PageContainer>
      <Pie {...config} />
    </PageContainer>
  );
};
export default InterfaceAnalysis;
