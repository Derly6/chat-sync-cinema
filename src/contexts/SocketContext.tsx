
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// Mock socket interface for demo purposes
interface MockSocket {
  emit: (event: string, data: any) => void;
  on: (event: string, callback: (data: any) => void) => void;
  off: (event: string) => void;
  connected: boolean;
}

interface SocketContextType {
  socket: MockSocket | null;
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const [socket, setSocket] = useState<MockSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Create mock socket for demo purposes
    const mockSocket: MockSocket = {
      emit: (event: string, data: any) => {
        console.log('Socket emit:', event, data);
        // In a real implementation, this would send data to the server
      },
      on: (event: string, callback: (data: any) => void) => {
        console.log('Socket listening for:', event);
        // In a real implementation, this would listen for server events
      },
      off: (event: string) => {
        console.log('Socket stop listening for:', event);
        // In a real implementation, this would remove event listeners
      },
      connected: true,
    };

    setSocket(mockSocket);
    setIsConnected(true);

    // Simulate connection delay
    const timeout = setTimeout(() => {
      console.log('Mock socket connected');
    }, 1000);

    return () => {
      clearTimeout(timeout);
      setSocket(null);
      setIsConnected(false);
    };
  }, []);

  const value: SocketContextType = {
    socket,
    isConnected,
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};
