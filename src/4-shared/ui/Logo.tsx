import Image from "next/image";
import Link from "next/link";

type Props = {
  width: number;
  height: number;
  className?: string;
};

export function Logo({ width, height, className}: Props) {
  return (
    <div>
      <Link href="/">
        <Image
          src="logo.svg"
          width={width}
          height={height}
          alt="Nice Gadgets logo"
        />
      </Link>
    </div>
  );
}
