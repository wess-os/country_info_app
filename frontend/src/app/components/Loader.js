import React from 'react';
import { LuLoader2 } from 'react-icons/lu';

const Loader = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <LuLoader2 className="animate-spin text-blue-500" size={48} />
        </div>
    );
};

export default Loader;
