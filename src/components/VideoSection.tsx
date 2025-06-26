import { useState, useRef } from 'react';
import { Video, Youtube, Volume2, VolumeX } from 'lucide-react';

const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMuteUnmute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
  };

  const handleMouseEnter = () => {
    if (videoRef.current && !isPlaying) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current && isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section className="py-20 bg-black text-white" role="region" aria-labelledby="video-section-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 id="video-section-heading" className="text-4xl font-bold mb-4">
            Just Do It
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Experience the power of shoeNP innovation through our athletes' journeys. 
            Witness determination, dedication, and the relentless pursuit of greatness.
          </p>
        </div>

        <div 
          className="relative max-w-4xl mx-auto"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              onEnded={handleVideoEnded}
              poster="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
              aria-describedby="video-description"
              preload="metadata"
              muted={isMuted}
            >
              <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
              <track 
                kind="captions" 
                srcLang="en" 
                label="English"
                default 
              />
              Your browser does not support the video tag.
            </video>
          </div>

          <div id="video-description" className="sr-only">
            shoeNP brand video showcasing athletic performance and innovation
          </div>

          {/* Custom Play Button Overlay */}
          {!isPlaying && (
            <button
              onClick={handlePlayPause}
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 hover:bg-opacity-60 transition-all duration-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
              aria-label="Play shoeNP brand video"
            >
              <div className="bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-6 transform hover:scale-110 transition-all duration-300">
                <Video className="h-12 w-12 text-black" aria-hidden="true" />
              </div>
            </button>
          )}

          {/* Mute/Unmute Button */}
          <button
            onClick={handleMuteUnmute}
            className="absolute top-4 right-4 bg-black bg-opacity-60 hover:bg-opacity-80 text-white p-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? (
              <VolumeX className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Volume2 className="h-5 w-5" aria-hidden="true" />
            )}
          </button>

          {/* Video Stats */}
          <div className="flex justify-center mt-8 space-x-8 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <Youtube className="h-4 w-4" aria-hidden="true" />
              <span>2.5M views</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>•</span>
              <span>Just Do It Campaign 2024</span>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <h3 className="text-2xl font-bold mb-4">Ready to Join the Movement?</h3>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            Discover the gear that empowers athletes worldwide to push beyond their limits.
          </p>
          <button 
            className="bg-white text-black px-8 py-3 text-lg font-semibold rounded-full hover:bg-gray-100 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
            aria-label="Shop shoeNP athletic collection"
          >
            Shop Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
