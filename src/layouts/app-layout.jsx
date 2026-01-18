import Header from '@/components/Header';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    // 1. Min-height screen ensures the footer is always at least at the bottom of the viewport
    // 2. Flex-col stacks items vertically
    <div className="min-h-screen flex flex-col bg-sky-100">

      <Header />

      {/* 3. flex-1 makes this section grow to fill available space, pushing footer down */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet />
      </main>

      {/* 4. Removed 'fixed', 'bottom-0', 'left-0'. 
             The Flex layout handles the positioning now. */}
      <footer className="w-full text-center py-6 text-sm text-white bg-sky-900 border-t border-sky-200 mt-auto">
        © 2025 <span className="font-semibold">WeIntern®</span>. All rights reserved.
      </footer>

    </div>
  );
}

export default AppLayout;