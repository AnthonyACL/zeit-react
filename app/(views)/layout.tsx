"use client";

import { WorkSessionProvider } from "@/app/(views)/-componentes/WorkSessionContext";
import WorkWidget from "@/components/workwidget";
import React, { useState, useEffect } from "react";

export default function ContentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  // Obtener usuario del localStorage
  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('currentUser');
      if (user) {
        try {
          setCurrentUser(JSON.parse(user));
        } catch (e) {
          console.error('Error parsing user:', e);
        }
      }
    }
  }, []);

  const showWorkWidget = mounted && currentUser?.role !== 'Admin';

  return (
    <WorkSessionProvider>
      {children}
      {showWorkWidget && <WorkWidget />}
    </WorkSessionProvider>
  );
}