import { faAppStoreIos } from '@fortawesome/free-brands-svg-icons';
import { faCloud } from '@fortawesome/free-solid-svg-icons';

const appRoutes = {
  label: 'Dashboard',
  labelDisable: true,
  children: [
    {
      name: 'Apps',
      active: true,
      icon: faAppStoreIos,
      children: [
        {
          name: 'Calendar',
          to: 'dashboard',
          exact: true,
          active: true,
          icon: 'calendar-alt',
          badge: {
            type: 'success',
            text: 'New'
          }
        },
        {
          name: 'Weather',
          to: 'weather',
          active: true,
          icon: faCloud,
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
