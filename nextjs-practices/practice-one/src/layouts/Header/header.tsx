import { Logo } from '@/components/common/ui/logo';
import Navbar from './navbar/navbar';

const Header = () => {
  return (
    <header className="w-full border-b bg-white">
      <div className="container mx-auto flex items-center justify-between py-3 px-2 md:px-0">
        <Logo href="/" src="/images/logo.svg" />
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
