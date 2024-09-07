import Image from 'next/image';
import Link from 'next/link';

const Logo = () => {
  return (
    <div className="flex justify-center py-4 mt-9 md:mt-0 border-b border-black">
      <Link href="/">
        <Image
          src="/assets/images/aba-logo.png"
          alt="logo"
          width={96}
          height={106}
          priority={true}
        />
      </Link>
    </div>
  );
};

export default Logo;
