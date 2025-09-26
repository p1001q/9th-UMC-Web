import './App.css';
import Navbar from "./components/Navbar";
import Todo from './components/Todo';
import { TodoProvider } from './context/TodoContext';
import { ThemeProvider } from './context/ThemeProvider';
//import TodoBefore from './components/TodoBefore';

function App() {
  
  return (
    <ThemeProvider>    {/* ✅ 테마 컨텍스트 추가 */}
      <TodoProvider>
        <Navbar />
        <Todo />
      </TodoProvider>
    </ThemeProvider>
  );
}

export default App;
