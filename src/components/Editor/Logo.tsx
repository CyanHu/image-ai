import Link from "next/link";
import Image from "next/image";
import { useTranslations } from 'next-intl';

const Logo = () => {
  const t = useTranslations('Logo');
  
  return (
    <Link href="/">
      <div className="size-8 relative shrink-0">
        <Image
          priority
          className="shrink-0 hover:opacity-75 transition"
          src="/logo.svg"
          fill
          alt={t('alt')}
        />
      </div>
    </Link>
  );
};

export default Logo;
