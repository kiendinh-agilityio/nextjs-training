import SideNav from "@/app/ui/dashboard/sidenav";
import { GracefullyDegradingErrorBoundary } from "@/app/dashboard/error";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
    <div className="w-full flex-none md:w-64">
      <SideNav />
    </div>
    <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
      <GracefullyDegradingErrorBoundary>
        {children}
      </GracefullyDegradingErrorBoundary>
    </div>
  </div>
);

export default Layout;
