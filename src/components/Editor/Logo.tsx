import Link from "next/link";
import Image from "next/image";

const Logo = () => {
  return (
    <Link href="/">
      <div className="size-8 relative shrink-0">
        <Image
          className="shrink-0 hover:opacity-75 transition"
          src="/logo.svg"
          fill
          alt="Image AI"
        />
      </div>
    </Link>
  );
};

export default Logo;
