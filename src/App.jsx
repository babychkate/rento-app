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
      wrapperRef.current.style.transformOrigin = 'top center';
    };
    scale();
    window.addEventListener('resize', scale);
    return () => window.removeEventListener('resize', scale);
  }, []);

  return (
    // зовнішній контейнер — скролиться
    <div style={{
      width: '100vw',
      height: '100vh',
      overflowY: 'auto',
      display: 'flex',
      justifyContent: 'center',
      background: '#000',
    }}>
      {/* внутрішній — масштабується, але росте разом з контентом */}
      <div ref={wrapperRef} style={{
        width: DESIGN_WIDTH,
        minHeight: DESIGN_HEIGHT,
        flexShrink: 0,
        transformOrigin: 'top center',
      }}>
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
