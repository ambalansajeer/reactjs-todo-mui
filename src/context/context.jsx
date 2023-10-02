import { createContext, useState } from "react";
import { getTodoApi } from "../includes/ApiFunctions";

const initial = {
  currentTodo: null,
  alert: {},
  showModal: false,
  todoList: [],
  setTodoList: () => {},
  setCurrentTodo: () => {},
  setAction: () => {},
};
export const AppContext = createContext(initial);

export const AppContextProvider = ({ children }) => {
  const [todoList, setTodoList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [alert, setAlert] = useState(initial.alert);
  const loadTodoList = async () => {
    const data = await getTodoApi("");
    setTodoList(data);
  };

  const setAction = (type, data = null) => {
    switch (type) {
      case "initial":
        loadTodoList();
        break;
      case "modalAction":
        setShowModal(data);
        break;
      case "currentTodo":
        setCurrentTodo(data);
        break;
      case "updateTodoList":
        setShowModal(true);
        setCurrentTodo(data);
        break;
      default:
        break;
    }
    setTodoList({});
  };
  const value = {
    todoList,
    setAction,
    showModal,
    currentTodo,
    setShowModal,
    setCurrentTodo,
    alert,
    setAlert,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
