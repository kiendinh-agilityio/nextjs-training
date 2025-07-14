import { Heading } from '@/components/common/ui/heading';

interface CartContainerProps {
  children: React.ReactNode;
}

const CartContainer = ({ children }: CartContainerProps) => (
  <div className="container mx-auto mt-12 lg:mt-5 lg:min-h-[600px] lg:px-0">
    <Heading size="lg" className="mb-8 text-primary">
      Your Cart
    </Heading>
    {children}
  </div>
);

export default CartContainer;
