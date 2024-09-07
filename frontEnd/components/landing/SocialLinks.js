import Link from 'next/link';
import { FaFacebook, FaYoutube } from 'react-icons/fa';
import { AiFillInstagram } from 'react-icons/ai';

const SocialLinks = () => {
  return (
    <div className="flex items-center gap-3">
      <p className="p14 font-secondary">
        <Link
          target="blank"
          href="https://www.instagram.com/accessbehavioranalysis/"
        >
          <AiFillInstagram className="h-6 w-6" />
        </Link>
      </p>

      <p className="p14 font-secondary">
        <Link
          target="blank"
          href="https://www.facebook.com/accessbehavioranalysis"
        >
          <FaFacebook className="h-5 w-5" />
        </Link>
      </p>

      <p className="p14 font-secondary">
        <Link
          target="blank"
          href="https://www.youtube.com/channel/UCboyBqCfIelGZkv-4v93-mg"
        >
          <FaYoutube className="h-6 w-6" />
        </Link>
      </p>
    </div>
  );
};

export default SocialLinks;
