import WelcomeScreen from './screens/Welcome/WelcomeScreen';

const App = () => {
  const handleNext = () => {
    // Navigate to next screen / router push
    console.log('Next step');
  };

  return <WelcomeScreen onNext={handleNext} />;
};

export default App;
