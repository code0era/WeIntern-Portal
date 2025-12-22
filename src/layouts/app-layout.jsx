import Header from '@/components/Header';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return <div>
    <div className='grid-background'></div>
    <main className='min-h-screen container'>
      <Header/>
      <Outlet />
    </main>
    <div className='p-8 text-center bg-gray-800 mt-8'>All rights are reserved, Copyright © 2025 WeIntern® </div>
  </div>;
}

export default AppLayout
