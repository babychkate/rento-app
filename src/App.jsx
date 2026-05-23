import { useState } from 'react';
import WelcomeScreen from './screens/Welcome/WelcomeScreen';
import LoginScreen from './screens/Login/LoginScreen';
import RegisterScreen from './screens/Register/RegisterScreen';

const App = () => {
  const [screen, setScreen] = useState('welcome');

  return (
    <>
      {screen === 'welcome' && (
        <WelcomeScreen
          onNext={() => setScreen('login')}
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
    </>
  );
};

export default App;
