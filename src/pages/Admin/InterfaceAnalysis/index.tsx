import { PageContainer } from '@ant-design/pro-components';
import '@umijs/max';
import React, { useEffect, useState } from 'react';

import { invokeInterfaceTop } from '@/services/wen-api-backend/interfaceInfoController';
import ReactECharts from 'echarts-for-react';

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
      name: item.interfaceName,
      value: 10,
    };
  });

  const option = {
    title: {
      text: 'Referer of a Website',
      subtext: 'Fake Data',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: charData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };

  return (
    <PageContainer>
      <ReactECharts option={option} />
    </PageContainer>
  );
};
export default InterfaceAnalysis;
