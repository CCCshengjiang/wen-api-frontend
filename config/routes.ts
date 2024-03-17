export default [
  {
    path: '/user',
    layout: false,
    routes: [{ name: '登录', path: '/user/login', component: './User/Login' }],
  },
  { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
  { path: '/interface', name: '接口信息', icon: 'smile', component: './InterfaceList' },
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
      {
        icon: 'table',
        path: '/admin/user',
        name: '用户管理',
        component: './Admin/User',
      },
      {
        icon: 'table',
        path: '/admin/interface',
        name: '接口管理',
        component: './Admin/InterfaceInfo',
      },
      {
        icon: 'analysis',
        path: '/admin/interface_analysis',
        name: '接口分析',
        component: './Admin/InterfaceAnalysis',
      },
      { path: '/admin/sub-page', name: '二级管理', component: './Admin' },
    ],
  },
  { path: '/user/center', name: '个人中心', icon: 'user', component: './User/Center' },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
