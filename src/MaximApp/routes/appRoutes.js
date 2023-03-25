const appRoutes = {
  label: 'Dashboard',
  labelDisable: true,
  children: [
    {
      name: 'Apps',
      active: true,
      icon: 'rocket',
      children: [
        {
          name: 'LandingPage',
          to: '/',
          exact: true,
          active: true
        },
        {
          name: 'Weather',
          to: '/weather',
          active: true
        },
        {
          name: 'CRM',
          to: '/dashboard/crm',
          active: true
        },
        {
          name: 'E Commerce',
          to: '/dashboard/e-commerce',
          active: true
        },
        {
          name: 'LMS',
          to: '/dashboard/lms',
          active: true,
          badge: {
            type: 'success',
            text: 'New'
          }
        },
        {
          name: 'Management',
          to: '/dashboard/project-management',
          active: true
        },
        {
          name: 'SaaS',
          to: '/dashboard/saas',
          active: true
        },
        {
          name: 'Support desk',
          to: '/dashboard/support-desk',
          active: true,
          badge: {
            type: 'success',
            text: 'New'
          }
        }
      ]
    }
  ]
};

export default [appRoutes];
