
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavItem {
  name: string;
  path: string;
  isMain: boolean;
}

const TronNavigation: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems: NavItem[] = [
    { name: "Home", path: "/", isMain: true },
    { name: "About Me", path: "/about", isMain: true },
    { name: "Games", path: "/games", isMain: true },
    { name: "Apps", path: "/apps", isMain: true },
    { name: "Web Sites", path: "/websites", isMain: true },
    { name: "Code Examples", path: "/code", isMain: true },
    { name: "3D Printing", path: "/3d-printing", isMain: false },
    { name: "3D Models", path: "/3d-models", isMain: false },
    { name: "Electronics", path: "/electronics", isMain: false },
    { name: "Other Projects", path: "/other", isMain: false },
  ];

  return (
    <div className="fixed top-0 left-0 z-40 p-2 flex flex-wrap gap-1">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`tron-button ${
            item.isMain ? 'text-sm md:text-base' : 'text-xs md:text-sm'
          } ${
            currentPath === item.path 
              ? 'bg-tron-cyan bg-opacity-20 border-opacity-100 glow-border' 
              : 'bg-opacity-10 border-opacity-50'
          } rhombus-shape`}
          style={{
            width: item.isMain ? 'auto' : 'auto',
            minWidth: item.isMain ? '90px' : '70px',
            padding: item.isMain ? '0.4rem 0.6rem' : '0.3rem 0.5rem',
            margin: '0.15rem',
            transform: 'skew(-10deg)',
          }}
        >
          <span style={{ display: 'block', transform: 'skew(10deg)' }}>
            {item.name}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default TronNavigation;
