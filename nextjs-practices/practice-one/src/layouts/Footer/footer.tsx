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
        'flex flex-col xl:flex-row xl:justify-center',
        'px-[26px] pb-[45px] pt-[58px]',
        'bg-[rgba(217,217,217,0.6)]',
        'lg:pb-[58px] lg:pt-[93px]',
      )}
    >
      <div className="container px-0 xl:flex xl:gap-44">
        <div className="mb-[61px] flex flex-col items-center xl:max-w-[361px] xl:items-start">
          <Logo
            href="/"
            src="/images/logo.svg"
            className="mb-[31px] h-[66px] w-[268px]"
          />
          <div className="mb-[21px] flex gap-[2px]">
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
          <p className="mb-4 px-[30px] text-left font-base text-[15px] text-black lg:px-0">
            Company # 490039-445, Registered with House of companies.
          </p>
        </div>
        <div className="lg:flex lg:justify-between xl:w-[calc(1527px-361px)] xl:gap-11">
          <div className="mb-2 flex w-full flex-col md:items-center lg:items-start">
            <p className="mb-[13px] text-[18px] font-bold leading-[43px]">
              Get Exclusive Deals in your Inbox
            </p>
            <form className="relative mb-1 flex h-[58px] w-full rounded-full border md:max-w-[485px]">
              <input
                type="email"
                placeholder="youremail@gmail.com"
                className={cn(
                  'flex-1 rounded-full bg-[#d9d9d9] px-[25px] py-[10px] text-secondary outline-none',
                  'placeholder:text-[14px] placeholder:leading-[43px]',
                )}
              />
              <button
                type="submit"
                className={cn(
                  'absolute right-0 rounded-full bg-primary px-[42px] py-[19px] text-[18px] font-medium leading-[18px] text-white',
                )}
              >
                Subscribe
              </button>
            </form>
            <p className="text-center text-[13px] leading-[43px] text-secondary">
              we wont spam, read our{' '}
              <Link href="#" className="underline">
                email policy
              </Link>
            </p>
            <ul className="my-4 flex justify-center gap-6">
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
          <div className="mt-4 flex w-full md:flex md:flex-row md:justify-around lg:mt-0 xl:justify-between xl:gap-11">
            <div className="mb-9">
              <p className="mb-2 text-[18px] font-bold leading-[43px]">
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
              <p className="mb-2 text-[18px] font-bold leading-[43px]">
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
    <div className="flex flex-col items-center bg-secondary py-[31px] lg:flex-row lg:justify-between lg:py-[26px]">
      <div className="container flex justify-center px-0 xl:justify-between">
        <p className="w-full text-center text-[15px] text-white md:w-auto md:text-left">
          Order.uk Copyright 2025, All Rights Reserved.
        </p>
        <div className="hidden gap-8 text-[15px] text-white xl:flex">
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
