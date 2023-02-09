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
        id: 'list',
        title: 'List',
        translate: 'MENU.APPS.USER.LIST',
        type: 'item',
        icon: 'circle',
        url: '/user/user-list'
      },
      {
        id: 'view',
        title: 'View',
        translate: 'MENU.APPS.USER.VIEW',
        type: 'item',
        icon: 'circle',
        url: 'apps/user/user-view'
      },
      {
        id: 'edit',
        title: 'Edit',
        translate: 'MENU.APPS.USER.EDIT',
        type: 'item',
        icon: 'circle',
        url: 'app/user/user-edit'
      }
    ]
  }
]

