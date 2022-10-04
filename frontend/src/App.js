import './App.css';
import Header from './components/header';
import Provider from './context/Provider';
import Input from './components/InputBeneficiriarios';
import ShowReturn from './components/ShowReturn';

function App() {
  return (
    <Provider>
      <Header />
      <Input />
      <ShowReturn />
    </Provider>
  );
}

export default App;
