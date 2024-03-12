export default [
  {
    path: '/user',
    layout: false,
    routes: [{ name: '登录', path: '/user/login', component: './User/Login' }],
  },
  { path: '/index', name: '欢迎', icon: 'smile', component: './Index' },
  {
    path: '/interface/:id',
    name: '查看接口信息',
    icon: 'smile',
    component: './InterfaceInfo',
    hideInMenu: true,
  },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { path: '/admin', redirect: '/admin/interface' },
      {
        icon: 'table',
        path: '/admin/interface',
        name: '接口管理',
        component: './Admin/InterfaceInfo',
      },
      { path: '/admin/sub-page', name: '二级管理', component: './Admin' },
    ],
  },
  { path: '/', redirect: '/index' },
  { path: '*', layout: false, component: './404' },
];
