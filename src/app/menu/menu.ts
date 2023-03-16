import { CoreMenu } from "@core/types";

//? DOC: http://localhost:7777/demo/vuexy-angular-admin-dashboard-template/documentation/guide/development/navigation-menus.html#interface

export const menu: CoreMenu[] = [
  // Dashboard
  {
    id: "dashboard",
    title: "Dashboard",
    translate: "MENU.DASHBOARD.COLLAPSIBLE",
    type: "item",
    // role: ['Admin'], //? To hide collapsible based on user role
    icon: "home",
    url: "dashboard",
  },
  // Apps & Pages
  {
    id: "apps",
    type: "section",
    title: "Apps & Pages",
    translate: "MENU.APPS.SECTION",
    icon: "package",
    // children: [
    //   {
    //     id: "slider-management",
    //     title: "Slider Management",
    //     translate: "MENU.PAGES.SLIDER",
    //     type: "item",
    //     // icon: 'circle',
    //     url: "slider-management",
    //   },
    //   {
    //     id: "contact-us",
    //     title: "Contact Us",
    //     translate: "MENU.PAGES.CONTACTUS",
    //     type: "item",
    //     // icon: 'circle',
    //     url: "contact-us",
    //     // collapsed: true
    //   },
    //   {
    //     id: "about-us",
    //     title: "About Us",
    //     translate: "MENU.PAGES.ABOUTUS",
    //     type: "item",
    //     // icon: 'circle',
    //     url: "about-us",
    //   },
    // ],
  },
  {
    id: 'users',
    title: 'User',
    translate: 'MENU.APPS.USER.COLLAPSIBLE',
    type: 'collapsible',
    icon: 'user',
    children: [
      

      {
        id: 'admin',
        title: 'Admin',
        translate: 'MENU.APPS.USER.COLLAPSIBLE',
        type: 'collapsible',
        icon: 'user',
        children: [
          
          {
            id: 'list',
            title: 'AdminList',
            translate: 'MENU.APPS.USER.LIST',
            type: 'item',
            icon: 'circle',
            url: '/main/adminlist'
          },
        ]
      },

      {
        id: 'list',
        title: 'UserList',
        translate: 'MENU.APPS.USER.LIST',
        type: 'item',
        icon: 'circle',
        url: '/user/user-list'
      },
      {
        id: 'slider',
        title: 'Slider',
        translate: 'MENU.APPS.USER.VIEW',
        type: 'item',
        icon: 'circle',
        url: '/main/slider'
      },
      {
        id: 'feedback',
        title: 'Feedback',
        translate: 'MENU.APPS.USER.COLLAPSIBLE',
        type: 'collapsible',
        icon: 'book',
        children: [
          
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
            url: '/feed/list'
          },
        ]
      },
    ]
  }
]

