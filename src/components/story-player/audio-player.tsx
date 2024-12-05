import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AudioPlayerProps {
  audioUrl: string;
  text: string;
  onTimeUpdate?: (currentTime: number) => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  audioUrl,
  text,
  onTimeUpdate,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('loadedmetadata', () => {
        setDuration(audioRef.current?.duration || 0);
      });

      audioRef.current.addEventListener('timeupdate', () => {
        setCurrentTime(audioRef.current?.currentTime || 0);
        onTimeUpdate?.(audioRef.current?.currentTime || 0);
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('loadedmetadata', () => {});
        audioRef.current.removeEventListener('timeupdate', () => {});
      }
    };
  }, [onTimeUpdate]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setVolume(value);
    if (audioRef.current) {
      audioRef.current.volume = value;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-lg p-6">
      <audio ref={audioRef} src={audioUrl} />
      
      <div className="space-y-4">
        {/* Text display */}
        <div className="bg-gray-50 p-4 rounded-lg max-h-32 overflow-y-auto">
          <p className="text-gray-800">{text}</p>
        </div>

        {/* Progress bar */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">{formatTime(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-sm text-gray-500">{formatTime(duration)}</span>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              onClick={togglePlay}
              className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 text-white" />
              ) : (
                <Play className="w-6 h-6 text-white" />
              )}
            </Button>
            <Button
              onClick={() => {
                if (audioRef.current) {
                  audioRef.current.currentTime -= 10;
                }
              }}
              className="bg-gray-100 hover:bg-gray-200"
            >
              <SkipBack className="w-5 h-5" />
              10s
            </Button>
            <Button
              onClick={() => {
                if (audioRef.current) {
                  audioRef.current.currentTime += 10;
                }
              }}
              className="bg-gray-100 hover:bg-gray-200"
            >
              10s
              <SkipForward className="w-5 h-5" />
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <Volume2 className="w-5 h-5 text-gray-500" />
            <input
              type="range"
              min={0}
              max={1}
              step={0.1}
              value={volume}
              onChange={handleVolumeChange}
              className="w-24 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};