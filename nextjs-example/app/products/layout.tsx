import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
};

const ProductsLayout = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);

export default ProductsLayout;
