export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'fa fa-th-large ts-fa-gradient',
    },
    {
      name: 'Reports',
      url: '/reports',
      icon: 'fa fa-pie-chart ts-fa-gradient',
      children: [
        {
          name: 'Overview',
          url: '/reports/overview',
          icon: 'fa fa-pie-chart ts-fa-gradient',
        },
        {
          name: 'Hourly',
          url: '/reports/hourly',
          icon: 'fa fa-pie-chart ts-fa-gradient',
        },
        {
          name: 'Weekly',
          url: '/reports',
          icon: 'fa fa-pie-chart ts-fa-gradient',
        },
        {
          name: 'Monthly',
          url: '/reports',
          icon: 'fa fa-pie-chart ts-fa-gradient',
        },
        {
          name: 'Price',
          url: '/reports',
          icon: 'fa fa-pie-chart ts-fa-gradient',
        },
        {
          name: 'Volume',
          url: '/reports',
          icon: 'fa fa-pie-chart ts-fa-gradient',
        },
        {
          name: 'Markets',
          url: '/reports',
          icon: 'fa fa-pie-chart ts-fa-gradient',
        },
        {
          name: 'Setups',
          url: '/reports',
          icon: 'fa fa-pie-chart ts-fa-gradient',
        },
        {
          name: 'Mistakes',
          url: '/reports',
          icon: 'fa fa-pie-chart ts-fa-gradient',
        },
      ]
    },
    {
      name: 'Trades',
      url: '/trades',
      icon: 'fa fa-exchange ts-fa-gradient',
      children: [
        {
          name: 'Trades',
          url: '/trades',
          icon: 'fa fa-exchange ts-fa-gradient',
        },
        {
          name: 'Journal',
          url: '/trades',
          icon: 'fa fa-exchange ts-fa-gradient',
        },
      ]
    },
    {
      name: 'Performance',
      url: '/performance',
      icon: 'fa fa-sliders ts-fa-gradient',
      children: [
        {
          name: 'Evaluator',
          url: '/performance',
          icon: 'fa fa-sliders ts-fa-gradient',
        },
        {
          name: 'Simulator',
          url: '/performance/simulator',
          icon: 'fa fa-sliders ts-fa-gradient',
        },
        {
          name: 'Comparative',
          url: '/performance/comparative',
          icon: 'fa fa-sliders ts-fa-gradient',
        },
        {
          name: 'Management',
          url: '/performance',
          icon: 'fa fa-sliders ts-fa-gradient',
        },
      ]
    },
    {
      title: false,
      name: '',
      url: 'no-url',
      class: 'ts-mt-auto',
    },
    {
      name: 'Configuration',
      url: '/configuration',
      icon: 'fa fa-cog ts-fa-gradient',
      class: 'ts-menu-up-class',
      children: [
        {
          name: 'Trade Settings',
          url: '/configurations/trades',
          icon: 'fa fa-cog ts-fa-gradient',
        },
        {
          name: 'Privacy',
          url: '/configurations/privacy',
          icon: 'fa fa-cog ts-fa-gradient',
        },
        {
          name: 'Notifications',
          url: '/configurations/notifications',
          icon: 'fa fa-cog ts-fa-gradient',
        },
        {
          name: 'Mentor',
          url: '/configurations/mentor',
          icon: 'fa fa-cog ts-fa-gradient',
        },
        {
          name: 'Import Trades',
          url: '/configurations/import',
          icon: 'fa fa-cog ts-fa-gradient',
        },
      ]
    },
    {
      name: 'Profile',
      url: '/profile',
      icon: 'fa fa-user-circle ts-fa-gradient',
      class: 'ts-menu-up-class2',
      children: [
        {
          name: 'Personal Information',
          url: '/profile/profile',
          icon: 'fa fa-user-circle ts-fa-gradient',
        },
        {
          name: 'Account Plan',
          url: '/profile/account',
          icon: 'fa fa-user-circle ts-fa-gradient',
        },
        {
          name: 'Invoices',
          url: '/profile/invoices',
          icon: 'fa fa-user-circle ts-fa-gradient',
        },
      ]
    },
  ]
}
