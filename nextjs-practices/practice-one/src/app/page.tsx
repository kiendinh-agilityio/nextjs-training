import { Heading } from '@/components/common/ui/heading';

const Homepage = () => {
  return (
    <main className="container mx-auto">
      <Heading as="h1" size="xl">
        Feast Your Senses, <span className="text-primary">Fast and Fresh</span>
      </Heading>
    </main>
  );
};

export default Homepage;
