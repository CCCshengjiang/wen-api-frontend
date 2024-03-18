import { GithubOutlined, WechatOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import '@umijs/max';
import { Tooltip } from 'antd';
import React from 'react';

const Footer: React.FC = () => {
  const defaultMessage = 'wen';
  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      // @ts-ignore
      copyright={
        <>
          {`${currentYear} ${defaultMessage}`} |{' '}
          <a target={'_blank'} href={'https://beian.miit.gov.cn/'} rel="noreferrer">
            {' '}
            陕ICP备2023018547号-1
          </a>
        </>
      }
      links={[
        {
          key: 'github',
          title: (
            <Tooltip title="查看本站技术及源码，欢迎 star">
              <GithubOutlined /> 支持项目
            </Tooltip>
          ),
          href: 'https://github.com/CCCshengjiang/wen-api-backend',
          blankTarget: true,
        },
        {
          key: 'contact',
          title: (
            <Tooltip title="微信">
              <WechatOutlined /> 联系作者
            </Tooltip>
          ),
          href: '/imag/WeChat.jpg',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
