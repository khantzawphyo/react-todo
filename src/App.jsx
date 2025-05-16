import TodoList from "./components/TodoList";
import TodoProvider from "./context/TodoProvider";
import Footer from "./components/Footer";
import { Toaster } from "sonner";

const App = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-violet-50 via-white to-violet-50/50">
      <main className="mt-12 flex flex-grow flex-col items-center px-4 pb-8">
        <div className="w-full max-w-2xl">
          <TodoProvider>
            <TodoList />
            <Toaster 
              closeButton 
              richColors 
              position="top-right"
              toastOptions={{
                className: 'rounded-xl !bg-white !text-stone-800 !shadow-lg',
                duration: 3000,
              }} 
            />
          </TodoProvider>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;