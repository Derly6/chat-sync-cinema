
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, MessageCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useSocket } from "@/contexts/SocketContext";

interface Message {
  id: string;
  user: string;
  message: string;
  timestamp: Date;
  avatar: string;
}

interface ChatProps {
  roomId: string;
}

const Chat = ({ roomId }: ChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      user: 'Alice',
      message: 'Hey everyone! Ready for movie night? 🍿',
      timestamp: new Date(),
      avatar: '🍿'
    },
    {
      id: '2',
      user: 'Bob',
      message: 'Absolutely! What are we watching?',
      timestamp: new Date(),
      avatar: '🎭'
    }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const { user } = useAuth();
  const { socket } = useSocket();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!socket) return;

    socket.on('new-message', (message: Message) => {
      setMessages(prev => [...prev, message]);
    });

    return () => {
      socket.off('new-message');
    };
  }, [socket]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;

    const message: Message = {
      id: Date.now().toString(),
      user: user.name,
      message: newMessage,
      timestamp: new Date(),
      avatar: '🎬'
    };

    setMessages(prev => [...prev, message]);
    
    if (socket) {
      socket.emit('send-message', { roomId, message });
    }

    setNewMessage("");
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  return (
    <Card className="glass-card border-white/10 h-96 flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-white font-display flex items-center">
          <MessageCircle className="h-5 w-5 mr-2" />
          Chat
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-4 pt-0">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-3 mb-4">
          {messages.map((message) => (
            <div key={message.id} className="flex space-x-3">
              <div className="flex-shrink-0">
                <span className="text-lg">{message.avatar}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-semibold text-white">
                    {message.user}
                  </span>
                  <span className="text-xs text-gray-400">
                    {formatTime(message.timestamp)}
                  </span>
                </div>
                <p className="text-sm text-gray-300 mt-1 break-words">
                  {message.message}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Message Input */}
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-purple-500"
          />
          <Button
            type="submit"
            size="sm"
            className="btn-gradient text-white"
            disabled={!newMessage.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default Chat;
