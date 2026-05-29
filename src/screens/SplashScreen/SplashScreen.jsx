import { useEffect } from 'react';

const SplashScreen = ({ onFinish }) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden"
      style={{ background: '#a0adfc' }}>
      <video
        src="/Intro.mp4"
        autoPlay
        muted
        playsInline
        className="w-55 h-55 object-contain"
        onEnded={onFinish}
      />
    </div>
  );
};

export default SplashScreen;