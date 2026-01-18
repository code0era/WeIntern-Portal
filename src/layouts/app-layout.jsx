import Header from '@/components/Header';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return <div>
    <main >
      <Header />
      <Outlet />
    </main>
    {/* <footer className="fixed bottom-0 left-0 w-full text-center py-3 text-sm text-white bg-sky-900 border-t border-sky-200 z-50">
      © 2025 <span className="font-semibold">WeIntern®</span>. All rights reserved.
    </footer> */}
  </div>;
}

export default AppLayout
