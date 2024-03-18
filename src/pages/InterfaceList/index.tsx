import { listInterfaceByPage } from '@/services/wen-api-backend/interfaceInfoController';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Card, Pagination, message, theme } from 'antd';
import React, { useEffect, useState } from 'react';

/**
 * 每个单独的卡片，为了复用样式抽成了组件
 * @param param0
 * @returns
 */
const InfoCard: React.FC<{
  title: string;
  index: number;
  desc: string;
  href: string;
}> = ({ title, href, index, desc }) => {
  const { useToken } = theme;

  const { token } = useToken();

  return (
    <div
      style={{
        backgroundColor: token.colorBgContainer,
        boxShadow: token.boxShadow,
        borderRadius: '8px',
        fontSize: '14px',
        color: token.colorTextSecondary,
        lineHeight: '22px',
        padding: '16px 19px',
        minWidth: '220px',
        flex: 1,
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '4px',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            lineHeight: '22px',
            backgroundSize: '100%',
            textAlign: 'center',
            padding: '8px 16px 16px 12px',
            color: '#FFF',
            fontWeight: 'bold',
            backgroundImage:
              "url('https://gw.alipayobjects.com/zos/bmw-prod/daaf8d50-8e6d-4251-905d-676a24ddfa12.svg')",
          }}
        >
          {index}
        </div>
        <div
          style={{
            fontSize: '16px',
            color: token.colorText,
            paddingBottom: 8,
          }}
        >
          {title}
        </div>
      </div>
      <div
        style={{
          fontSize: '14px',
          color: token.colorTextSecondary,
          textAlign: 'justify',
          lineHeight: '22px',
          marginBottom: 8,
        }}
      >
        {desc}
      </div>
      <a href={href} rel="noreferrer">
        查看详细信息 {'>'}
      </a>
    </div>
  );
};

const Index: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [interfaceList, setInterfaceList] = useState<API.InterfaceInfo[]>([]);
  const [totalNum, setTotalNum] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(8);
  const loadData = async (current: number, pageSize: number) => {
    setLoading(true);
    try {
      const res = await listInterfaceByPage({
        pageRequest: { current, pageSize },
      });
      setInterfaceList(res?.data?.records ?? []);
      setTotalNum(res?.data?.total ?? 0);
    } catch (error) {
      message.error('接口列表查询失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(currentPage, pageSize);
  }, [currentPage, pageSize]);

  const handlePageChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    if (pageSize) setPageSize(pageSize);
  };

  const handleShowSizeChange = (current: number, size: number) => {
    setPageSize(size);
    setCurrentPage(1); // 当改变每页显示条目数时，回到第一页
  };

  const { token } = theme.useToken();
  const { initialState } = useModel('@@initialState');
  return (
    <PageContainer>
      <Card
        loading={loading}
        style={{
          borderRadius: 8,
        }}
        styles={{
          body: {
            backgroundImage:
              initialState?.settings?.navTheme === 'realDark'
                ? 'background-image: linear-gradient(75deg, #1A1B1F 0%, #191C1F 100%)'
                : 'background-image: linear-gradient(75deg, #FBFDFF 0%, #F5F7FF 100%)',
          },
        }}
      >
        <div>
          <div
            style={{
              fontSize: '20px',
              color: token.colorTextHeading,
              marginBottom: '30px',
            }}
          >
            欢迎使用 wen-api 平台开放的接口
          </div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
            {interfaceList.map((item, index) => (
              <InfoCard
                key={index}
                index={index + 1}
                href={`/interface/${item.id}`}
                title={item.interfaceName ?? ''}
                desc={item.interfaceDescription ?? ''}
              />
            ))}
          </div>
        </div>
        <Pagination
          style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}
          size={'small'}
          current={currentPage}
          pageSize={pageSize}
          onChange={handlePageChange}
          onShowSizeChange={handleShowSizeChange}
          total={totalNum}
          hideOnSinglePage
          showTotal={(total, range) => `第 ${range} 条/共计：${total} 条`}
        />
      </Card>
    </PageContainer>
  );
};

export default Index;
