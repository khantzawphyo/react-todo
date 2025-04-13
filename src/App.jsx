import React from "react";
import TodoList from "./components/TodoList";
import TodoProvider from "./context/TodoProvider";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-50 to-slate-100">
      <main className="mt-10 flex flex-grow flex-col items-center p-4">
        <div className="w-full max-w-md flex-auto">
          <TodoProvider>
            <TodoList />
          </TodoProvider>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;
