import React, { Suspense, useContext, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AppContext from 'context/Context';

import NavbarVertical from 'MaximApp/components/NavbarVertical';
import NavbarTop from 'MaximApp/components/Navbar/NavbarTop';
import RootProvider from 'MaximApp/providers/RootProvider';
import Loader from 'MaximApp/components/Loader';

const AppMainLayout = () => {
  const { hash, pathname } = useLocation();

  // const isChat = pathname.includes('chat');

  const {
    config: { isFluid, navbarPosition }
  } = useContext(AppContext);

  useEffect(() => {
    setTimeout(() => {
      if (hash) {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
      }
    }, 0);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <RootProvider>
      <div className={'container'}>
        {(navbarPosition === 'vertical' || navbarPosition === 'combo') && (
          <NavbarVertical />
        )}

        <div className={'content pb-0'}>
          <NavbarTop />
          {/*------ Main Routes ------*/}
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </RootProvider>
  );
};

export default AppMainLayout;
