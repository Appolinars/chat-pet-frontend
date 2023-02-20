import { MainProvider } from "./providers/MainProvider";
import { AppRouter } from "./router/AppRouter";
import "./styles/app.scss";

function App() {
  return (
    <div className="App">
      <MainProvider>
        <AppRouter />
      </MainProvider>
    </div>
  );
}

export default App;
