import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";

function Breadcrumbs() {
  const location = useLocation();

  const pathnames = location.pathname
    .split("/")
    .filter((x) => x);

  return (
    <div className="flex items-center text-sm text-gray-500">

      {/* Home */}
      <Link to="/" className="hover:text-gray-800">
        Dashboard
      </Link>

      {pathnames.map((value, index) => {
        const to = "/" + pathnames.slice(0, index + 1).join("/");
        const isLast = index === pathnames.length - 1;

        return (
          <div key={to} className="flex items-center">

            <ChevronRight size={14} className="mx-2" />

            {isLast ? (
              <span className="text-gray-800 capitalize">
                {value}
              </span>
            ) : (
              <Link
                to={to}
                className="hover:text-gray-800 capitalize"
              >
                {value}
              </Link>
            )}

          </div>
        );
      })}
    </div>
  );
}

export default Breadcrumbs;