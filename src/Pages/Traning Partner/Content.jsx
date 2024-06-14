import { Button } from '@/components(shadcn)/ui/button';
import TopBar from '@/Components/Traning Partner/TopBar';
import React from 'react';
import { Eye } from 'lucide-react';

const Content = () => {
  return (
    <div className="w-full">
      {/* Topbar content */}
      <div>
        <TopBar />
      </div>

      {/* content Part */}
      <div className="p-4 bg-slate-400 h-full gap-2">
        <div className="bg-white p-4 rounded-md flex flex-col md:flex-row justify-between items-start md:items-center shadow-md">
          <div className="mb-2 md:mb-0">BatchName</div>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
            <span className="mr-2">
              <Eye />
            </span>
            <Button className="mr-0 md:mr-2 mb-2 md:mb-0">addTeacher</Button>
            <Button>addStudent</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
