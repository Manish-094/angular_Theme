import { CoreMenu } from "@core/types";

//? DOC: http://localhost:7777/demo/vuexy-angular-admin-dashboard-template/documentation/guide/development/navigation-menus.html#interface

export const menu: CoreMenu[] = [
  // Dashboard
  {
    id: "dashboard",
    title: "Dashboard",
    translate: "MENU.DASHBOARD.COLLAPSIBLE",
    type: "collapsible",
    // role: ['Admin'], //? To hide collapsible based on user role
    icon: "home",
    // url: "dashboard",
  },
  // Apps & Pages
  {
    id: "apps",
    type: "section",
    title: "Apps & Pages",
    translate: "MENU.APPS.SECTION",
    icon: "package",

  },
  {
    id: 'users',
    title: 'User',
    translate: 'MENU.APPS.USER.COLLAPSIBLE',
    type: 'collapsible',
    role:['Admin'],
    icon: 'user',
    children: [

      {
        id: 'list',
        title: 'UserList',
        translate: 'MENU.APPS.USER.LIST',
        type: 'item',
        icon: 'circle',
        url: '/user/user-list'
      },

      // {
      //   id: 'admin',
      //   title: 'Admin',
      //   translate: 'MENU.APPS.USER.COLLAPSIBLE',
      //   type: 'collapsible',
      //   icon: 'user',
      //   children: [

      //     {
      //       id: 'list',
      //       title: 'AdminList',
      //        role:['Admin'],
      //       translate: 'MENU.APPS.USER.LIST',
      //       type: 'item',
      //       icon: 'circle',
      //       url: '/main/adminlist'
      //     },
      //   ]
      // },

      // {
      //   id: 'list',
      //   title: 'UserList',
      //   translate: 'MENU.APPS.USER.LIST',
      //   type: 'item',
      //   icon: 'circle',
      //   url: '/user/user-list'
      // },
      // {
      //   id: 'slider',
      //   title: 'Slider',
      //   translate: 'MENU.APPS.USER.VIEW',
      //   type: 'item',
      //   icon: 'circle',
      //   url: '/main/slider'
      // },
      // {
      //   id: 'feedback',
      //   title: 'Feedback',
      //   role:['Admin'],
      //   translate: 'MENU.APPS.USER.COLLAPSIBLE',
      //   type: 'collapsible',
      //   icon: 'book',
      //   children: [

      //     {
      //       id: 'list',
      //       title: 'Query',
      //       translate: 'MENU.APPS.USER.LIST',
      //       type: 'item',
      //       icon: 'circle',
      //       url: '/feed/selfquery'
      //     },
      //     {
      //       id: 'list',
      //       title: 'List',
      //       translate: 'MENU.APPS.USER.LIST',
      //       type: 'item',
      //       icon: 'circle',
      //       url: '/feed/list'
      //     },
      //     {
      //       id: 'list',
      //       title: 'AssignTo',
      //       translate: 'MENU.APPS.USER.LIST',
      //       type: 'item',
      //       role:[''],
      //       icon: 'circle',
      //       url: '/feed/assign'
      //     }
      //   ]
      // },
    ]
  },
  // {
  //   id: 'users',
  //   title: 'Admin',
  //   role:['Admin'],
  //   translate: 'MENU.APPS.USER.COLLAPSIBLE',
  //   type: 'collapsible',
  //   icon: 'user',
  //   children: [

  //     // {
  //     //   id: 'list',
  //     //   title: 'Admin List',
  //     //   translate: 'MENU.APPS.USER.LIST',
  //     //   type: 'item',
  //     //   icon: 'circle',
  //     //   url: '/main/adminlist'
  //     // },
   
  //   ]
  // },
  {
    id:'user',
    title:'Feedback',
    translate:'MENU.APPS.USER.COLLAPSIBLE',
    type:'collapsible',
    icon:'book',
    children:[
      {
        id: 'list',
        title: 'Query',
        translate: 'MENU.APPS.USER.LIST',
        type: 'item',
        icon: 'circle',
        url: '/feed/selfquery'
      },
      {
        id: 'list',
        title: 'List',
        translate: 'MENU.APPS.USER.LIST',
        type: 'item',
        icon: 'circle',
        role:['Admin'],
        url: '/feed/list'
      },
      {
        id: 'list',
        title: 'AssignQuery',
        translate: 'MENU.APPS.USER.LIST',
        type: 'item',
        icon: 'circle',
        role:['HR_MANAGER','Network Head','ACCOUNT_HEAD','DELIVERY_MANAGER'],
        url: '/feed/assign'
      }
    ]
   }
]

