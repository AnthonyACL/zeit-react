'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type SessionStatus = 'idle' | 'working' | 'break' | 'finished' | 'submitted';

interface WorkSessionContextType {
  status: SessionStatus;
  workSeconds: number;
  breakSeconds: number;
  startWork: () => void;
  startBreak: () => void;
  endWork: () => void;
  resetSession: () => void;
}

const WorkSessionContext = createContext<WorkSessionContextType | undefined>(undefined);

export const WorkSessionProvider = ({ children }: { children: ReactNode }) => {
  const [status, setStatus] = useState<SessionStatus>('idle');
  const [workSeconds, setWorkSeconds] = useState(0);
  const [breakSeconds, setBreakSeconds] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (status === 'working') {
      interval = setInterval(() => setWorkSeconds((prev) => prev + 1), 1000);
    } else if (status === 'break') {
      interval = setInterval(() => setBreakSeconds((prev) => prev + 1), 1000);
    }

    return () => clearInterval(interval);
  }, [status]);

  const startWork = () => setStatus('working');
  const startBreak = () => setStatus('break');
  
  const endWork = () => {
    setStatus('finished');
    setTimeout(() => setStatus('submitted'), 2000); // Espera 2 seg en rojo
    setTimeout(() => {
      setStatus('idle');
      setWorkSeconds(0);
      setBreakSeconds(0);
    }, 5000); // Resetea todo después
  };

  const resetSession = () => {
    setStatus('idle');
    setWorkSeconds(0);
    setBreakSeconds(0);
  };

  return (
    <WorkSessionContext.Provider value={{ 
      status, 
      workSeconds, 
      breakSeconds, 
      startWork, 
      startBreak, 
      endWork, 
      resetSession 
    }}>
      {children}
    </WorkSessionContext.Provider>
  );
};

export const useWorkSession = () => {
  const context = useContext(WorkSessionContext);
  if (!context) throw new Error('useWorkSession debe usarse dentro de WorkSessionProvider');
  return context;
};