import './App.css';
import Navbar from './components/Navbar/Navbar';
import TeslaBattery from './containers/TeslaBattery/TeslaBattery';
function App() {
  return (
    <div className="App">
      <Navbar />
      <TeslaBattery />
    </div>
  );
}

export default App;
