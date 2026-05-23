import { useState } from 'react';
import WelcomeScreen from './screens/Welcome/WelcomeScreen';
import LoginScreen from './screens/Login/LoginScreen';
import RegisterScreen from './screens/Register/RegisterScreen';
import StepIndicator from './components/StepIndicator/StepIndicator';
import CategoryScreen from './screens/Category/CategoryScreen';

const App = () => {
  const [screen, setScreen] = useState('welcome');
  

  return (
   <div className="w-107.5 h-233 relative overflow-y-auto mx-auto">
      {screen === 'welcome' && (
        <WelcomeScreen
          onLogin={() => setScreen('login')}
          onRegister={() => setScreen('register')}
        />
      )}
      {screen === 'login' && (
        <LoginScreen
          onBack={() => setScreen('welcome')}
          onNext={() => setScreen('category')}
          onForgot={() => console.log('forgot')}
          onRegister={() => setScreen('register')}
        />
      )}
      {screen === 'register' && (
        <RegisterScreen
          onBack={() => setScreen('login')}
          onNext={() => setScreen('category')}
          onLogin={() => setScreen('login')}
        />
      )}

      {screen === 'category' && (
        <CategoryScreen
          onBack={() => setScreen('register')}
          onNext={() => console.log('category selected')}
        />
      )}
    </div>
  );
};

export default App;
