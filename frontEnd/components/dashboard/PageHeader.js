import Image from 'next/image';
import Link from 'next/link';

const PageHeader = () => {
  return (
    <div className="py-4 md:mt-0">
      <div className="p14 font-secondary flex justify-end gap-5 h-16 items-center">
        <p>CART (0)</p>
        <p>LOGIN</p>
      </div>
    </div>
  );
};

export default PageHeader;
