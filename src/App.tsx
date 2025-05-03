import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { SignInForm } from "./SignInForm";
import { SignOutButton } from "./SignOutButton";
import { Toaster } from "sonner";
import { Whiteboard } from "./Whiteboard";
import { BoardList } from "./BoardList";

function SignOutWrapper() {
  return (
    <div className="fixed top-4 right-4 z-50">
      <button 
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
      >
        Sign Out
      </button>
    </div>
  );
}

export default function App() {
  const loggedInUser = useQuery(api.auth.loggedInUser);

  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900 dark:text-white">
      <Authenticated>
        <SignOutWrapper />
      </Authenticated>
      <main className="flex-1 flex">
        <Content />
      </main>
      <Toaster theme="system" />
    </div>
  );
}

function Content() {
  const loggedInUser = useQuery(api.auth.loggedInUser);

  if (loggedInUser === undefined) {
    return (
      <div className="flex justify-center items-center w-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex">
      <Authenticated>
        <BoardList />
      </Authenticated>
      <Unauthenticated>
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">
                SkyeDraw
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">Sign in to get started</p>
            </div>
            <SignInForm />
          </div>
        </div>
      </Unauthenticated>
    </div>
  );
}
