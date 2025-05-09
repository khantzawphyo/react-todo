import React from "react";
import TodoList from "./components/TodoList";
import TodoProvider from "./context/TodoProvider";
import Footer from "./components/Footer";
import { Toaster } from "sonner";
import { ThemeToggle } from "./components/theme-toggle";

const App = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b">
        <div className="mx-auto flex max-w-4xl items-center justify-between p-4">
          <h1 className="font-heading text-xl font-bold">Tasks</h1>
          <ThemeToggle />
        </div>
      </header>
      
      <main className="mt-10 flex flex-grow flex-col items-center p-4">
        <div className="w-full max-w-md flex-auto">
          <TodoProvider>
            <TodoList />
            <Toaster closeButton richColors position="top-right" />
          </TodoProvider>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;