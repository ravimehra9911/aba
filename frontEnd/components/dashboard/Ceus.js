import React from 'react';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const Ceus = () => {
  return (
    <div>
      <Link href="/ceu">
        <div className="flex justify-center items-center border-b border-black py-4">
          <span className="pr-4">
            <ArrowLeftIcon className="h-4 w-4" />
          </span>
          <p className="p14 font-secondary pr-6">CEUs</p>
        </div>
      </Link>
    </div>
  );
};

export default Ceus;
