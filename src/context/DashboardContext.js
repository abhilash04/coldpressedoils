import React, { createContext, useContext, useState, useEffect } from 'react';

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    const savedState = localStorage.getItem('dashboard_sidebar_open');
    return savedState !== null ? JSON.parse(savedState) : true;
  });

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => {
      const newState = !prev;
      localStorage.setItem('dashboard_sidebar_open', JSON.stringify(newState));
      return newState;
    });
  };

  return (
    <DashboardContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};
