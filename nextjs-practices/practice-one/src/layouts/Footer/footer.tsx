import Link from 'next/link';
import Image from 'next/image';
import { Logo } from '@/components/common/ui/logo';
import {
  FacebookIcon,
  InstagramIcon,
  SnapchatIcon,
  TiktokIcon,
} from '@/components/Icons';
import { cn } from '@/lib/utils';

const Footer = () => (
  <footer className="mt-[45px]">
    <div
      className={cn(
        'bg-[rgba(217,217,217,0.6)] pt-[58px] pb-[45px] px-[26px] flex flex-col',
        'lg:pt-[93px] lg:pb-[58px] xl:flex-row xl:justify-center',
      )}
    >
      <div className="container px-0 xl:flex xl:gap-44">
        <div className="flex flex-col items-center mb-[61px] xl:items-start xl:max-w-[361px]">
          <Logo
            href="/"
            src="/images/logo.svg"
            className="w-[268px] h-[66px] mb-[31px]"
          />
          <div className="flex gap-[2px] mb-[21px]">
            <button>
              <Image
                src="/images/app-store.svg"
                alt="App Store"
                width={180}
                height={53}
              />
            </button>
            <button>
              <Image
                src="/images/google-play.svg"
                alt="Google Play"
                width={180}
                height={53}
              />
            </button>
          </div>
          <p className="font-base text-left text-black text-[15px] mb-4 px-[30px] lg:px-0">
            Company # 490039-445, Registered with House of companies.
          </p>
        </div>
        <div className="lg:flex lg:justify-between xl:gap-11 xl:w-[calc(1527px-361px)]">
          <div className="w-full flex flex-col mb-2 md:items-center lg:items-start">
            <p className="font-bold text-[18px] leading-[43px] mb-[13px]">
              Get Exclusive Deals in your Inbox
            </p>
            <form className="relative flex w-full mb-1 border rounded-full h-[58px] md:max-w-[485px]">
              <input
                type="email"
                placeholder="youremail@gmail.com"
                className="flex-1 rounded-full text-secondary px-[25px] py-[10px] bg-[#d9d9d9] outline-none placeholder:text-[14px] placeholder:leading-[43px]"
              />
              <button
                type="submit"
                className="absolute rounded-full bg-primary text-white px-[42px] py-[19px] font-medium text-[18px] leading-[18px] right-0"
              >
                Subscribe
              </button>
            </form>
            <p className="text-secondary text-[13px] leading-[43px] text-center">
              we wont spam, read our{' '}
              <Link href="#" className="underline">
                email policy
              </Link>
            </p>
            <ul className="flex justify-center gap-6 my-4">
              <li>
                <Link href="#">
                  <FacebookIcon />
                </Link>
              </li>
              <li>
                <Link href="#">
                  <InstagramIcon />
                </Link>
              </li>
              <li>
                <Link href="#">
                  <TiktokIcon />
                </Link>
              </li>
              <li>
                <Link href="#">
                  <SnapchatIcon />
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full mt-4 md:flex md:flex-row md:justify-around lg:mt-0 xl:justify-between xl:gap-11">
            <div className="mb-9">
              <p className="font-bold text-[18px] leading-[43px] mb-2">
                Legal Pages
              </p>
              <ul className="flex flex-col text-[15px] leading-[43px]">
                <li>
                  <Link href="#" className="underline">
                    Terms and conditions
                  </Link>
                </li>
                <li>
                  <Link href="#" className="underline">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="underline">
                    Cookies
                  </Link>
                </li>
                <li>
                  <Link href="#" className="underline">
                    Modern Slavery Statement
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-bold text-[18px] leading-[43px] mb-2">
                Important Links
              </p>
              <ul className="flex flex-col text-[15px] leading-[43px]">
                <li>
                  <Link href="#" className="underline">
                    Get help
                  </Link>
                </li>
                <li>
                  <Link href="#" className="underline">
                    Add your restaurant
                  </Link>
                </li>
                <li>
                  <Link href="#" className="underline">
                    Sign up to deliver
                  </Link>
                </li>
                <li>
                  <Link href="#" className="underline">
                    Create a business account
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="bg-secondary py-[31px] flex flex-col items-center lg:flex-row lg:justify-between lg:py-[26px]">
      <div className="container px-0 flex justify-center xl:justify-between">
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
    </div>
  </footer>
);

export default Footer;
