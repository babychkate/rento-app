import { useEffect, useRef, useState } from 'react';
import WelcomeScreen from './screens/Welcome/WelcomeScreen';
import LoginScreen from './screens/Login/LoginScreen';
import RegisterScreen from './screens/Register/RegisterScreen';

const DESIGN_WIDTH = 430;
const DESIGN_HEIGHT = 932;

const App = () => {
  const wrapperRef = useRef(null);
  const [screen, setScreen] = useState('welcome');

  useEffect(() => {
    const scale = () => {
      if (!wrapperRef.current) return;
      const s = Math.min(window.innerWidth / DESIGN_WIDTH, window.innerHeight / DESIGN_HEIGHT);
      wrapperRef.current.style.transform = `scale(${s})`;
    };
    scale();
    window.addEventListener('resize', scale);
    return () => window.removeEventListener('resize', scale);
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: '#000' }}>
      <div ref={wrapperRef} style={{ width: DESIGN_WIDTH, height: DESIGN_HEIGHT, transformOrigin: 'center center', flexShrink: 0 }}>
        {screen === 'welcome' && (
          <WelcomeScreen
            onLogin={() => setScreen('login')}
            onRegister={() => setScreen('register')}
          />
        )}
        {screen === 'login' && (
          <LoginScreen
            onBack={() => setScreen('welcome')}
            onNext={() => console.log('logged in')}
            onForgot={() => console.log('forgot')}
            onRegister={() => setScreen('register')}
          />
        )}
        {screen === 'register' && (
          <RegisterScreen
            onBack={() => setScreen('login')}
            onNext={() => console.log('registered')}
            onLogin={() => setScreen('login')}
          />
        )}
      </div>
    </div>
  );
};

export default App;