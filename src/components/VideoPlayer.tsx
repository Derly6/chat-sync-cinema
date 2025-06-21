
import { useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Play } from "lucide-react";

interface VideoPlayerProps {
  videoUrl: string;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  onPlay: () => void;
  onPause: () => void;
  onSeek: (time: number) => void;
  onTimeUpdate: (time: number) => void;
  onDurationChange: (duration: number) => void;
  onVolumeChange: (volume: number) => void;
}

const VideoPlayer = ({
  videoUrl,
  isPlaying,
  currentTime,
  volume,
  onPlay,
  onPause,
  onSeek,
  onTimeUpdate,
  onDurationChange,
}: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.play();
    } else {
      video.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.volume = volume;
  }, [volume]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const difference = Math.abs(video.currentTime - currentTime);
    if (difference > 1) {
      video.currentTime = currentTime;
    }
  }, [currentTime]);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video) {
      onTimeUpdate(video.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (video) {
      onDurationChange(video.duration);
    }
  };

  const handleSeekBarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    onSeek(time);
  };

  const getYouTubeEmbedUrl = (url: string) => {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/;
    const match = url.match(regex);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  };

  const youtubeEmbedUrl = videoUrl ? getYouTubeEmbedUrl(videoUrl) : null;

  return (
    <Card className="glass-card border-white/10 overflow-hidden">
      <div className="aspect-video bg-black relative">
        {!videoUrl ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Play className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">Load a video to start watching together</p>
              <p className="text-gray-500 text-sm mt-2">Paste a video URL above to get started</p>
            </div>
          </div>
        ) : youtubeEmbedUrl ? (
          <iframe
            src={youtubeEmbedUrl}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <video
            ref={videoRef}
            src={videoUrl}
            className="w-full h-full object-contain"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onPlay={onPlay}
            onPause={onPause}
          />
        )}
        
        {/* Custom Seek Bar */}
        {videoUrl && !youtubeEmbedUrl && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleSeekBarChange}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
          </div>
        )}
      </div>
    </Card>
  );
};

export default VideoPlayer;
