import Link from 'next/link';

const Footer = () => (
  <footer className="bg-secondary">
    <div className="container py-[31px] flex flex-col items-center xl:flex-row xl:justify-between">
      <p className="text-white text-[15px] text-center md:text-left w-full md:w-auto">
        Order.uk Copyright 2025, All Rights Reserved.
      </p>
      <div className="hidden xl:flex gap-8 text-white text-[15px]">
        <Link href="#" className="hover:underline">
          Privacy Policy
        </Link>
        <Link href="#" className="hover:underline">
          Terms
        </Link>
        <Link href="#" className="hover:underline">
          Pricing
        </Link>
        <Link href="#" className="hover:underline">
          Do not sell or share my personal information
        </Link>
      </div>
    </div>
  </footer>
);

export default Footer;
