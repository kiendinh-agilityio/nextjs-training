import { Logo } from '@/components/common/ui/logo';
import Navbar from './Navbar/Navbar';
import { cn } from '@/lib/utils';

const Header = () => (
  <header className="w-full bg-white">
    <div
      className={cn(
        'container mx-auto flex items-center justify-between',
        'py-3 px-2 md:px-0 lg:py-[41px]',
      )}
    >
      <Logo href="/" src="/images/logo.svg" />
      <Navbar />
    </div>
  </header>
);

export default Header;
