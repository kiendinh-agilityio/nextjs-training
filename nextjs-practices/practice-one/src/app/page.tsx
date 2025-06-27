import { Heading } from '@/components/common/ui/heading';
import { Logo } from '@/components/common/ui/logo';

const Homepage = () => {
  return (
    <main className="container mx-auto">
      <Logo href="/" src="/images/logo.svg" />
      <Heading as="h1" size="xl">
        Feast Your Senses, <span className="text-primary">Fast and Fresh</span>
      </Heading>
    </main>
  );
};

export default Homepage;
