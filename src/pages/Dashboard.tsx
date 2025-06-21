
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Plus, Users, LogOut, Copy, ExternalLink } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

const Dashboard = () => {
  const [roomCode, setRoomCode] = useState("");
  const [rooms, setRooms] = useState([
    { id: "room-1", name: "Movie Night with Friends", participants: 3, isActive: true },
    { id: "room-2", name: "Saturday Watch Party", participants: 1, isActive: false },
  ]);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    const newRoom = {
      id: `room-${Date.now()}`,
      name: `${user?.name}'s Room`,
      participants: 1,
      isActive: true
    };
    setRooms([newRoom, ...rooms]);
    navigate(`/room/${newRoom.id}`);
    toast({
      title: "Room created!",
      description: "Your new watch party room is ready.",
    });
  };

  const handleJoinRoom = () => {
    if (roomCode.trim()) {
      navigate(`/room/${roomCode}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    toast({
      title: "Logged out",
      description: "You've been successfully logged out.",
    });
  };

  const copyRoomCode = (roomId: string) => {
    navigator.clipboard.writeText(roomId);
    toast({
      title: "Room code copied!",
      description: "Share this code with your friends to join.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cinema-950 via-cinema-900 to-cinema-950">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg">
                <Play className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-display font-bold gradient-text">
                WatchTogether
              </span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-gray-300">Welcome, {user?.name}!</span>
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="text-white hover:bg-white/10"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="glass-card border-white/10">
              <CardHeader>
                <CardTitle className="text-white font-display">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  onClick={handleCreateRoom}
                  className="w-full btn-gradient text-white font-semibold py-6"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Create New Room
                </Button>
                
                <div className="space-y-2">
                  <Input
                    placeholder="Enter room code"
                    value={roomCode}
                    onChange={(e) => setRoomCode(e.target.value)}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-purple-500"
                  />
                  <Button
                    onClick={handleJoinRoom}
                    variant="outline"
                    className="w-full border-white/20 text-white hover:bg-white/10"
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Join Room
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* My Rooms */}
          <div className="lg:col-span-2">
            <Card className="glass-card border-white/10">
              <CardHeader>
                <CardTitle className="text-white font-display">My Rooms</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {rooms.map((room) => (
                    <div
                      key={room.id}
                      className="glass-card p-6 border-white/5 hover:border-purple-500/30 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white mb-2">
                            {room.name}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-300">
                            <span className="flex items-center">
                              <Users className="h-4 w-4 mr-1" />
                              {room.participants} participant{room.participants !== 1 ? 's' : ''}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              room.isActive 
                                ? 'bg-green-500/20 text-green-400' 
                                : 'bg-gray-500/20 text-gray-400'
                            }`}>
                              {room.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Button
                            onClick={() => copyRoomCode(room.id)}
                            variant="ghost"
                            size="sm"
                            className="text-gray-300 hover:text-white hover:bg-white/10"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Link to={`/room/${room.id}`}>
                            <Button
                              size="sm"
                              className="bg-purple-600 hover:bg-purple-700 text-white"
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Enter
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {rooms.length === 0 && (
                    <div className="text-center py-12">
                      <Play className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-400 text-lg">No rooms yet</p>
                      <p className="text-gray-500">Create your first room to start watching together!</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
