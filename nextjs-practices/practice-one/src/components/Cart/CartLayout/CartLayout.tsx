interface CartLayoutProps {
  children: React.ReactNode;
}

const CartLayout = ({ children }: CartLayoutProps) => (
  <div className="flex flex-col gap-8 text-secondary lg:flex-row lg:items-start">
    {children}
  </div>
);

export default CartLayout;
