import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { Whiteboard } from "./Whiteboard";
import { Id } from "../convex/_generated/dataModel";

export function BoardList() {
  const boards = useQuery(api.board.list) || [];
  const createBoard = useMutation(api.board.create);
  const [selectedBoardId, setSelectedBoardId] = useState<Id<"boards"> | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newBoardName, setNewBoardName] = useState("");

  const handleCreateBoard = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBoardName) return;

    const boardId = await createBoard({
      name: newBoardName,
      isPublic: false,
    });
    setNewBoardName("");
    setIsCreating(false);
    setSelectedBoardId(boardId);
  };

  if (selectedBoardId) {
    return <Whiteboard boardId={selectedBoardId} onClose={() => setSelectedBoardId(null)} />;
  }

  return (
    <div className="flex-1 p-8 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold dark:text-white">My Documents</h2>
          <button
            onClick={() => setIsCreating(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
          >
            New Document
          </button>
        </div>

        {isCreating && (
          <form onSubmit={handleCreateBoard} className="mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                value={newBoardName}
                onChange={(e) => setNewBoardName(e.target.value)}
                placeholder="Document name"
                className="flex-1 px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
              >
                Create
              </button>
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {boards.map((board) => (
            <div
              key={board._id}
              onClick={() => setSelectedBoardId(board._id)}
              className="group relative p-4 border rounded-lg cursor-pointer hover:border-indigo-500 dark:border-gray-700 dark:hover:border-indigo-500 bg-white dark:bg-gray-800 transition-all duration-200 hover:shadow-lg"
            >
              <div className="aspect-[4/3] mb-3 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 truncate">
                {board.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Modified {new Date(board.lastModified).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
      <footer className="fixed bottom-0 left-0 right-0 py-4 px-6 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        Made with ❤️ by NobleSkye using Excalidraw
      </footer>
    </div>
  );
}
