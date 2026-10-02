import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import PageWrapper from "@/components/PageWrapper";
import { ArrowRight } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <PageWrapper>
      <div className="min-h-[80vh] flex items-center justify-center pt-24">
        <div className="text-center px-6">
          <p className="text-bronze text-[11px] font-semibold tracking-[0.2em] uppercase mb-4">
            Page Not Found
          </p>
          <h1 className="font-serif text-6xl md:text-7xl text-charcoal font-light mb-6">404</h1>
          <p className="text-charcoal/50 text-lg font-light mb-10 max-w-md mx-auto">
            The page you are looking for does not exist or has been moved.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-3 px-8 py-4 bg-bronze text-white text-[12px] font-semibold tracking-[0.12em] uppercase hover:bg-bronze-dark transition-all duration-300"
          >
            Return Home
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </PageWrapper>
  );
};

export default NotFound;
