import { useState } from 'react';
import WelcomeScreen from './screens/Welcome/WelcomeScreen';
import LoginScreen from './screens/Login/LoginScreen';
import RegisterScreen from './screens/Register/RegisterScreen';
import StepIndicator from './components/StepIndicator/StepIndicator';

const App = () => {
  const [screen, setScreen] = useState('welcome');
  

  return (
    <div className="w-[430px] h-[932px] relative overflow-hidden mx-auto">
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
  );
};

export default App;
