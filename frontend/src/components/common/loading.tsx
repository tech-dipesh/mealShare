import { Loader } from 'lucide-react';
import React from 'react';

const Loading = () => {
  return (
    <div className='flex justify-center items-center p-4'>
      <Loader className='animate-spin h-6 w-6'/>
    </div>
  );
};

export default Loading;
