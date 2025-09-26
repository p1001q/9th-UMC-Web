//경고 안 없애도 되나?
import { createContext, type PropsWithChildren, useState, type JSX, useContext } 
from 'react';
import type { TTodo } from '../types/todo';

interface ITodoContext {
  todos: TTodo[];
  doneTodos: TTodo[];
  addTodo: (text: string) => void;
  completeTodo: (todo: TTodo) => void;
  deleteTodo: (todo: TTodo) => void;
}

export const TodoContext = createContext<ITodoContext | undefined>(undefined);

export const TodoProvider = ({ children }: PropsWithChildren): JSX.Element => {
    const [todos, setTodos] = useState<TTodo[]>([]);
    const [doneTodos, setDoneTodos] = useState<TTodo[]>([]);

    const addTodo = (text: string): void => {
        const newTodo: TTodo = { id: Date.now(), text };
        setTodos((prevTodos: TTodo[]) => [...prevTodos, newTodo]);
    };

    const completeTodo = (todo: TTodo): void => {
        setTodos((prevTodos: TTodo[]) =>
          prevTodos.filter((t) => t.id !== todo.id)
        );
        setDoneTodos((prevDoneTodos: TTodo[]) => [...prevDoneTodos, todo]);
      };
    
      const deleteTodo = (todo: TTodo): void => {
        setDoneTodos((prevDoneTodos: TTodo[]) =>
          prevDoneTodos.filter((t) => t.id !== todo.id)
        );
      };

    return (
        <TodoContext.Provider value={{ todos, doneTodos, addTodo, completeTodo, deleteTodo }}>
            {children}
        </TodoContext.Provider>
    );
}   

//이제 이 context를 App.tsx에서 감싸주고, Todo.tsx에서 useContext로 불러와서 사용하면 됨
export const useTodo = () : ITodoContext => {
    const context = useContext(TodoContext);
   //컨텍스트가 없는 경우
    if (!context) {
        throw new Error(
            'useTodo 사용하기 위해선 반드시 TodoProvider로 감싸야 한다'
        );
    }
    //컨텍스트가 있는 경우
    return context;
}
    
