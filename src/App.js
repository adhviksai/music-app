import React, { useState, useEffect } from "react";

const App = () => {
  const songs = [
    {
      name: "Covers",
      imageUrl: "/images/song1.jpeg",
      duration: 180,
    },
    {
      name: "Clouds",
      imageUrl: "/images/song2.jpg",
      duration: 240,
    },
    {
      name: "Title",
      imageUrl: "/images/song3.jpg",
      duration: 210,
    },
  ];

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentSongIndex((prevIndex) => 
      (prevIndex + 1) % songs.length
    );
    setProgress(0);
    setElapsedTime(0);
  };

  const handlePrev = () => {
    setCurrentSongIndex((prevIndex) => 
      (prevIndex - 1 + songs.length) % songs.length
    );
    setProgress(0);
    setElapsedTime(0);
  };

  const handleProgressClick = (e) => {
    const progressBar = e.target;
    const width = progressBar.clientWidth;
    const offsetX = e.nativeEvent.offsetX;
    const newProgress = (offsetX / width) * 100;
    setProgress(newProgress); 
    setElapsedTime((newProgress / 100) * songs[currentSongIndex].duration);
  };

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setElapsedTime((prevTime) => {
          const newTime = prevTime + 1;
          if (newTime >= songs[currentSongIndex].duration) {
            handleNext(); 
            return 0;
          }
          setProgress((newTime / songs[currentSongIndex].duration) * 100);
          return newTime;
        });
      }, 1000); 
    } else {
      clearInterval(interval); 
    }

    return () => clearInterval(interval); 
  }, [isPlaying, currentSongIndex]); 
  return (
    <div className="min-h-screen bg-gray-800 text-gray-200 flex flex-col">
      <div className="flex items-center justify-between p-4 bg-gray-700">
        <button className="text-white bg-gray-600 py-2 px-4 rounded">
          Home
        </button>
        <input
          type="text"
          placeholder="Search Box"
          className="flex-1 mx-4 p-2 text-black rounded"
        />
      </div>
      <div className="flex-grow flex flex-col items-center justify-center">
        <div className="w-80 h-80 flex items-center justify-center">
          <img src={songs[currentSongIndex].imageUrl} alt="Song cover" className="w-full h-full object-cover" />
        </div>
        <h2 className="mt-5 text-2xl">{songs[currentSongIndex].name}</h2>
        <div 
          className="w-64 h-2 bg-gray-500 rounded-full mt-4 cursor-pointer" 
          onClick={handleProgressClick}
        >
          <div 
            className="h-full bg-white rounded-full" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="flex mt-10">
          <button className="bg-white py-2 px-4 mx-6" onClick={handlePrev}>
            <img src="/images/prev-icon.png" alt="Previous" className="w-6 h-6" />
          </button>
          <button onClick={togglePlayPause} className="bg-white py-2 px-4 mx-6">
            {isPlaying ? (
              <img src="/images/pause-icon.png" alt="Pause" className="w-6 h-6" />
            ) : (
              <img src="/images/play-icon.png" alt="Play" className="w-6 h-6" />
            )}
          </button>
          <button className="bg-white py-2 px-4 mx-6" onClick={handleNext}>
            <img src="/images/next-icon.png" alt="Next" className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;