import { Logo } from '@/components/common/ui/logo';
import Navbar from './Navbar/Navbar';
import HeaderInfoBar from './HeaderInfoBar/HeaderInfoBar';

const Header = () => (
  <header className="w-full bg-white">
    <div className="container mx-auto flex flex-col-reverse gap-3 md:gap-0 md:px-0 lg:flex-col">
      <HeaderInfoBar />
      <div className="flex items-center justify-between py-3 lg:py-[41px]">
        <Logo href="/" src="/images/logo.svg" />
        <Navbar />
      </div>
    </div>
  </header>
);

export default Header;
