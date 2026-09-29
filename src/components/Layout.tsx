import React, { useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Map as MapIcon, 
  Search, 
  Target, 
  ClipboardCheck, 
  FileText, 
  Database, 
  Settings,
  Menu,
  X,
  RadioTower
} from 'lucide-react';
import clsx from 'clsx';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/missions', label: 'Missions', icon: MapIcon },
  { path: '/analysis', label: 'Analysis', icon: Search },
  { path: '/detections', label: 'Detections', icon: Target },
  { path: '/map', label: 'Map', icon: MapIcon },
  { path: '/review', label: 'Review', icon: ClipboardCheck },
  { path: '/reports', label: 'Reports', icon: FileText },
  { path: '/database', label: 'Database', icon: Database },
];

export function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-surface border-r border-border h-full">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-2 text-primary">
            <RadioTower size={32} />
            <div>
              <h1 className="font-bold text-xl tracking-wider leading-tight">HYDRA</h1>
              <h1 className="font-bold text-xl tracking-wider leading-tight">RECOVER</h1>
            </div>
          </div>
          <p className="text-text-muted text-xs mt-2 uppercase tracking-widest">AquaGuard AI</p>
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    clsx(
                      "flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm font-medium",
                      isActive 
                        ? "bg-surface-secondary text-primary border-l-2 border-primary" 
                        : "text-text-secondary hover:text-text-primary hover:bg-surface-secondary"
                    )
                  }
                >
                  <item.icon size={18} />
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t border-border">
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              clsx(
                "flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm font-medium",
                isActive 
                  ? "bg-surface-secondary text-primary border-l-2 border-primary" 
                  : "text-text-secondary hover:text-text-primary hover:bg-surface-secondary"
              )
            }
          >
            <Settings size={18} />
            Settings
          </NavLink>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 bg-surface border-b border-border">
          <div className="flex items-center gap-2 text-primary">
            <RadioTower size={24} />
            <h1 className="font-bold text-lg">HYDRA RECOVER</h1>
          </div>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-text-secondary hover:text-text-primary"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </header>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-[65px] left-0 right-0 bg-surface border-b border-border z-50 shadow-lg">
            <nav className="py-2">
              <ul className="space-y-1 px-4">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        clsx(
                          "flex items-center gap-3 px-3 py-3 rounded-md transition-colors text-sm font-medium",
                          isActive 
                            ? "bg-surface-secondary text-primary" 
                            : "text-text-secondary"
                        )
                      }
                    >
                      <item.icon size={18} />
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}

        {/* Top Header Bar for Desktop */}
        <header className="hidden md:flex h-16 items-center justify-between px-6 bg-surface border-b border-border shrink-0">
          <div>
            <h2 className="text-lg font-semibold text-text-primary capitalize">
              {location.pathname.replace('/', '') || 'Dashboard'}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs font-mono bg-warning/10 text-warning px-3 py-1 rounded-full border border-warning/20">
              <span className="w-2 h-2 rounded-full bg-warning animate-pulse"></span>
              DEMO MODE
            </div>
            <div className="flex items-center gap-2 text-xs font-mono bg-success/10 text-success px-3 py-1 rounded-full border border-success/20">
              <span className="w-2 h-2 rounded-full bg-success"></span>
              SYSTEM ONLINE
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-background relative">
          <Outlet />
        </main>
        
        {/* Mobile Bottom Nav */}
        <div className="md:hidden flex items-center justify-around bg-surface border-t border-border p-3 shrink-0">
          <NavLink to="/dashboard" className={({isActive}) => clsx("flex flex-col items-center gap-1", isActive ? "text-primary" : "text-text-secondary")}>
            <LayoutDashboard size={20} />
            <span className="text-[10px]">Dashboard</span>
          </NavLink>
          <NavLink to="/missions" className={({isActive}) => clsx("flex flex-col items-center gap-1", isActive ? "text-primary" : "text-text-secondary")}>
            <MapIcon size={20} />
            <span className="text-[10px]">Missions</span>
          </NavLink>
          <NavLink to="/map" className={({isActive}) => clsx("flex flex-col items-center gap-1", isActive ? "text-primary" : "text-text-secondary")}>
            <MapIcon size={20} />
            <span className="text-[10px]">Map</span>
          </NavLink>
          <NavLink to="/review" className={({isActive}) => clsx("flex flex-col items-center gap-1", isActive ? "text-primary" : "text-text-secondary")}>
            <ClipboardCheck size={20} />
            <span className="text-[10px]">Review</span>
          </NavLink>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="flex flex-col items-center gap-1 text-text-secondary">
            <Menu size={20} />
            <span className="text-[10px]">More</span>
          </button>
        </div>
      </div>
    </div>
  );
}
