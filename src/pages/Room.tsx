
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Play, 
  Pause, 
  Volume2, 
  Users, 
  Send, 
  Settings, 
  ArrowLeft,
  Copy,
  Share2
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useSocket } from "@/contexts/SocketContext";
import { toast } from "@/hooks/use-toast";
import VideoPlayer from "@/components/VideoPlayer";
import Chat from "@/components/Chat";
import ParticipantsList from "@/components/ParticipantsList";

const Room = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { socket } = useSocket();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [videoUrl, setVideoUrl] = useState("");
  
  const [participants] = useState([
    { id: '1', name: user?.name || 'You', isHost: true, avatar: '🎬' },
    { id: '2', name: 'Alice', isHost: false, avatar: '🍿' },
    { id: '3', name: 'Bob', isHost: false, avatar: '🎭' }
  ]);

  useEffect(() => {
    if (!roomId) {
      navigate('/dashboard');
      return;
    }

    // Join room via socket
    if (socket) {
      socket.emit('join-room', { roomId, user });
    }

    return () => {
      if (socket) {
        socket.emit('leave-room', { roomId, user });
      }
    };
  }, [roomId, socket, user, navigate]);

  const handlePlay = () => {
    setIsPlaying(true);
    if (socket) {
      socket.emit('video-play', { roomId, currentTime });
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
    if (socket) {
      socket.emit('video-pause', { roomId, currentTime });
    }
  };

  const handleSeek = (time: number) => {
    setCurrentTime(time);
    if (socket) {
      socket.emit('video-seek', { roomId, currentTime: time });
    }
  };

  const handleVideoUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (videoUrl.trim()) {
      if (socket) {
        socket.emit('video-url-change', { roomId, videoUrl });
      }
      toast({
        title: "Video loaded!",
        description: "The video has been loaded for all participants.",
      });
    }
  };

  const copyRoomLink = () => {
    const roomLink = `${window.location.origin}/room/${roomId}`;
    navigator.clipboard.writeText(roomLink);
    toast({
      title: "Room link copied!",
      description: "Share this link with your friends to join the room.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cinema-950 via-cinema-900 to-cinema-950">
      <div className="container mx-auto px-6 py-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => navigate('/dashboard')}
              variant="ghost"
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-2xl font-display font-bold text-white">
              Room: {roomId}
            </h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              onClick={copyRoomLink}
              variant="outline"
              size="sm"
              className="border-white/20 text-white hover:bg-white/10"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share Room
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Video Area */}
          <div className="lg:col-span-3 space-y-4">
            {/* Video URL Input */}
            <Card className="glass-card border-white/10">
              <CardContent className="p-4">
                <form onSubmit={handleVideoUrlSubmit} className="flex space-x-2">
                  <Input
                    placeholder="Paste video URL here (YouTube, Vimeo, etc.)"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-purple-500"
                  />
                  <Button
                    type="submit"
                    className="btn-gradient text-white"
                  >
                    Load Video
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Video Player */}
            <VideoPlayer
              videoUrl={videoUrl}
              isPlaying={isPlaying}
              currentTime={currentTime}
              duration={duration}
              volume={volume}
              onPlay={handlePlay}
              onPause={handlePause}
              onSeek={handleSeek}
              onTimeUpdate={setCurrentTime}
              onDurationChange={setDuration}
              onVolumeChange={setVolume}
            />

            {/* Video Controls */}
            <Card className="glass-card border-white/10">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button
                      onClick={isPlaying ? handlePause : handlePlay}
                      className="btn-gradient text-white"
                    >
                      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    
                    <div className="flex items-center space-x-2">
                      <Volume2 className="h-4 w-4 text-gray-400" />
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume}
                        onChange={(e) => setVolume(parseFloat(e.target.value))}
                        className="w-20 accent-purple-500"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-gray-300">
                    <span>{Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60).toString().padStart(2, '0')}</span>
                    <span>/</span>
                    <span>{Math.floor(duration / 60)}:{Math.floor(duration % 60).toString().padStart(2, '0')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Participants */}
            <ParticipantsList participants={participants} />
            
            {/* Chat */}
            <Chat roomId={roomId || ''} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;
