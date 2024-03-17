import EditForm from '@/pages/User/Center/components/EditForm';
import { changeApikey, getApikey, getCurrentUser } from '@/services/wen-api-backend/userController';
import { DownloadOutlined, EditOutlined } from '@ant-design/icons';
import { ActionType, ProCard } from '@ant-design/pro-components';
import { Avatar, Button, Card, Col, Modal, Row, Typography, message } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

const { Paragraph } = Typography;
const { Meta } = Card;

const Center: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<API.SafetyUserVO>();
  const [loading, setLoading] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [apiKey, setApiKey] = useState<API.ApiKeyVO>();

  // 查询密钥
  const GetApiKey = async () => {
    try {
      // 查询密钥
      const res = await getApikey();
      setApiKey(res?.data);
      return res.data;
    } catch (error: any) {
      message.error('查询密钥失败:' + error.message);
      return false;
    }
  };

  // 更换密钥
  const ChangeApiKey = async () => {
    try {
      setApiKey(undefined);
      // 更换密钥
      const res = await changeApikey();
      message.success('更新密钥成功');
      setApiKey(res?.data);
      return true;
    } catch (error: any) {
      message.error('更新失败:' + error.message);
      return false;
    }
  };

  useEffect(() => {
    setLoading(true);
    const fetchCurrentUser = async () => {
      try {
        const user = await getCurrentUser();
        setCurrentUser(user.data);
      } catch (error: any) {
        message.error('查询失败：' + error.message);
      }
      await GetApiKey();
      setLoading(false);
    };
    fetchCurrentUser();
  }, []);

  const handleEditClick = () => {
    setShowEditModal(true);
  };

  const handleCancel = () => {
    setShowEditModal(false);
  };

  const cardStyle = {
    width: '100%',
    marginBottom: 16,
  };

  const columnStyle = {
    flex: 1,
    marginBottom: 16,
  };

  return (
    <Row gutter={[16, 16]} style={{ display: 'flex' }}>
      <Col xs={24} sm={24} md={12} lg={12} xl={12} style={columnStyle}>
        <Card
          hoverable
          bordered={true}
          style={cardStyle}
          loading={loading}
          actions={[<EditOutlined key="edit" onClick={handleEditClick} />]}
        >
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <Avatar size={90} src={currentUser?.avatarUrl} />
          </div>
          <Meta
            title={<div style={{ textAlign: 'center' }}>{currentUser?.username}</div>}
            description={
              <>
                <p>性别: {currentUser?.gender === 1 ? '男' : '女'}</p>
                <p>账号: {currentUser?.userAccount}</p>
                <p>邮箱: {currentUser?.email || '用户暂未设置'}</p>
                <p>电话: {currentUser?.phone || '用户暂未设置'}</p>
                <p>
                  注册时间:{' '}
                  {currentUser?.createTime
                    ? new Date(currentUser.createTime).toISOString().split('T')[0]
                    : 'N/A'}
                </p>
                <p>
                  更新时间:{' '}
                  {currentUser?.updateTime
                    ? new Date(currentUser.updateTime).toISOString().split('T')[0]
                    : 'N/A'}
                </p>
              </>
            }
          />
        </Card>
        <Modal title="修改信息" open={showEditModal} onCancel={handleCancel} footer={null}>
          <EditForm currentUser={currentUser} onCancel={handleCancel} />
        </Modal>
      </Col>
      <Col xs={24} sm={24} md={12} lg={12} xl={12} style={columnStyle}>
        <Card
          title="调用客户端 SDK"
          hoverable
          bordered={true}
          style={{ ...cardStyle, textAlign: 'center' }}
          loading={loading}
          actions={[
            <Button
              key="download-btn"
              type="primary"
              shape="round"
              icon={<DownloadOutlined />}
              size={'large'}
            >
              安装 Java SDK
            </Button>,
          ]}
        >
          <ProCard
            title="开发者调用凭证"
            extra={
              <Button
                onClick={async () => {
                  await ChangeApiKey();
                  if (actionRef.current) {
                    actionRef.current.reload();
                  }
                }}
              >
                更新密钥
              </Button>
            }
            type="inner"
            bordered
            style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}
          >
            <React.Fragment>
              <ProCard type="inner" bordered style={{ textAlign: 'center' }}>
                <strong>accessKey：</strong>
                <Paragraph copyable>{apiKey?.accessKey}</Paragraph>
              </ProCard>
              <ProCard type="inner" bordered style={{ textAlign: 'center' }}>
                <strong>secretKey：</strong>
                <Paragraph copyable>{apiKey?.secretKey}</Paragraph>
              </ProCard>
            </React.Fragment>
          </ProCard>
        </Card>
      </Col>
    </Row>
  );
};

export default Center;
