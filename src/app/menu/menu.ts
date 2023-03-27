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
    role:['ADMIN'],
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
    ]
  },
 
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
        role:['ADMIN'],
        url: '/feed/list'
      },
      {
        id: 'list',
        title: 'AssignQuery',
        translate: 'MENU.APPS.USER.LIST',
        type: 'item',
        icon: 'circle',
        role:['HR_MANAGER','NETWORK_HEAD','ACCOUNT_HEAD','DELIVERY_MANAGER'],
        url: '/feed/assign'
      }
    ]
   }
]

