import { Logo } from '@/components/common/ui/logo';
import Navbar from './Navbar/Navbar';
import HeaderInfoBar from './HeaderInfoBar/HeaderInfoBar';

const Header = () => (
  <header className="fixed left-0 right-0 top-0 z-50 w-full bg-white shadow-sm">
    <div className="container mx-auto flex flex-col-reverse gap-3 pb-8 md:gap-0 md:px-0 md:pb-[38px] lg:flex-col lg:pb-0 xl:pb-1.5">
      <HeaderInfoBar />
      <div className="flex items-center justify-between py-3 lg:py-[41px]">
        <Logo href="/" src="/images/logo.svg" />
        <Navbar />
      </div>
    </div>
  </header>
);

export default Header;
