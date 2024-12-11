import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  VolumeX, 
  Disc3 
} from 'lucide-react';

export default function AudioPlayer({ 
  audioSrc, 
  title, 
  author, 
  audioRef, 
  isPlaying, 
  setIsPlaying 
}) {
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        // This will resume from where it was paused
        audio.play()
          .catch(error => {
            console.error("Audio playback error:", error);
            setIsPlaying(false);
          });
      } else {
        // This will only pause, not reset
        audio.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    const updateTime = () => {
      if (audio) {
        setCurrentTime(audio.currentTime);
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    audio?.addEventListener('timeupdate', updateTime);
    return () => audio?.removeEventListener('timeupdate', updateTime);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play()
          .catch(error => {
            console.error("Audio playback error:", error);
            setIsPlaying(false);
          });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    const updateProgress = () => {
      if (audio) {
        setCurrentTime(audio.currentTime);
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    audio?.addEventListener('timeupdate', updateProgress);
    return () => audio?.removeEventListener('timeupdate', updateProgress);
  }, []);

  // Add additional logging for debugging
  useEffect(() => {
    console.log('Audio Source:', audioSrc);
    console.log('Audio Ref:', audioRef.current);
  }, [audioSrc, audioRef]);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement) {
      console.error('Audio element is not available');
      return;
    }

    const updateProgress = () => {
      const progressPercent = (audioElement.currentTime / audioElement.duration) * 100;
      setProgress(progressPercent);
      setCurrentTime(audioElement.currentTime);
    };

    audioElement.addEventListener('timeupdate', updateProgress);
    
    return () => {
      audioElement.removeEventListener('timeupdate', updateProgress);
    };
  }, [audioRef]);

  const handlePlayPause = async () => {
    const audioElement = audioRef.current;
    if (!audioElement) {
      console.error('Audio element is not available');
      return;
    }

    try {
      if (isPlaying) {
        await audioElement.pause();
      } else {
        await audioElement.play().catch(error => {
          console.error('Error playing audio:', error);
          // Optional: Add user-friendly error handling
        });
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error('Error in play/pause:', error);
    }
  };

  const handleSeek = (e) => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    const seekBar = e.currentTarget;
    const clickPosition = e.nativeEvent.offsetX;
    const barWidth = seekBar.offsetWidth;
    const seekTime = (clickPosition / barWidth) * audioElement.duration;

    audioElement.currentTime = seekTime;
  };

  const handleSkip = (seconds) => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    audioElement.currentTime += seconds;
  };

  const toggleMute = () => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    if (isMuted) {
      audioElement.volume = volume;
      setIsMuted(false);
    } else {
      audioElement.volume = 0;
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (e) => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    const newVolume = parseFloat(e.target.value);
    audioElement.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto">
      <div className="flex items-center mb-4">
        <Disc3 className="w-12 h-12 text-pink-500 mr-4 animate-spin" />
        <div>
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-500">{author}</p>
        </div>
      </div>

      {/* Seek Bar */}
      <div 
        className="w-full h-2 bg-gray-200 rounded-full cursor-pointer mb-4"
        onClick={handleSeek}
      >
        <div 
          className="h-2 bg-pink-500 rounded-full" 
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Time Display */}
      <div className="flex justify-between text-xs text-gray-500 mb-4">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center space-x-6">
        <SkipBack 
          className="w-6 h-6 text-gray-500 hover:text-pink-500 cursor-pointer" 
          onClick={() => handleSkip(-10)} 
        />
        
        <button 
          onClick={handlePlayPause}
          className="bg-gradient-to-r from-pink-500 to-purple-500 text-white p-3 rounded-full hover:shadow-lg"
        >
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        </button>
        
        <SkipForward 
          className="w-6 h-6 text-gray-500 hover:text-pink-500 cursor-pointer" 
          onClick={() => handleSkip(10)} 
        />

        <div className="flex items-center">
          {isMuted ? (
            <VolumeX 
              className="w-5 h-5 text-gray-500 cursor-pointer" 
              onClick={toggleMute} 
            />
          ) : (
            <Volume2 
              className="w-5 h-5 text-gray-500 cursor-pointer" 
              onClick={toggleMute} 
            />
          )}
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.1" 
            value={volume}
            onChange={handleVolumeChange}
            className="ml-2 w-20 h-1 accent-pink-500"
          />
        </div>
      </div>

      <audio 
        ref={audioRef} 
        src={audioSrc}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onEnded={() => {
          setIsPlaying(false);
          setProgress(0);
        }}
        onError={(e) => {
          console.error('Audio error:', e);
        }}
      />
    </div>
  );
}