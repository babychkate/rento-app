import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';

import WelcomeScreen  from './screens/Welcome/WelcomeScreen';
import LoginScreen    from './screens/Login/LoginScreen';
import RegisterScreen from './screens/Register/RegisterScreen';
import CategoryScreen from './screens/Onboarding/Onboarding';
import HomeScreen from './screens/Home/HomeScreen';
import SplashScreen from './screens/SplashScreen/SplashScreen';

const App = () => {
  const [screen, setScreen] = useState('welcome');
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
  return (
    <div className="w-107.5 h-233 relative overflow-hidden mx-auto"
      style={{ transform: 'translateZ(0)' }}>
      <SplashScreen onFinish={() => setShowSplash(false)} />
    </div>
  );
  }
  
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="w-107.5 h-233 relative mx-auto">
          {screen === 'welcome' && (
            <WelcomeScreen
              onLogin={() => setScreen('login')}
              onRegister={() => setScreen('register')}
            />
          )}
          {screen === 'login' && (
            <LoginScreen
              onBack={() => setScreen('welcome')}
              onNext={() => setScreen('home')}
              onNextToCategory={() => setScreen('category')}
              onForgot={() => console.log('forgot')}
              onRegister={() => setScreen('register')}
            />
          )}
          {screen === 'register' && (
            <RegisterScreen
              onBack={() => setScreen('welcome')}
              onNext={() => setScreen('category')}
              onLogin={() => setScreen('login')}
            />
          )}
          {screen === 'category' && (
            <CategoryScreen
              onBack={() => setScreen('register')}
              onNext={() => setScreen('home')}
            />
          )}
          {screen === 'home' && (
            <HomeScreen
              onLogout={() => setScreen('welcome')}
            />
          )}
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
