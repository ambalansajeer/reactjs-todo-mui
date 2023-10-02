import "./App.css";
import Navbar from "./includes/Navbar";
import TodoList from "./includes/TodoList";
import AddBar from "./includes/AddBar";
import TodoForm from "./includes/TodoForm";
import { useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "./context/context";
import AppAlert from "./includes/AppAlert";
function App() {
  const { setAction } = useContext(AppContext);
  useEffect(() => {
    setAction("initial");
  }, []);

  return (
    <>
      <Navbar />
      <AddBar />
      <TodoList />
      <TodoForm />
      <AppAlert />
    </>
  );
}

export default App;
