import { useEffect, useState } from "react";
import { Excalidraw, MainMenu, WelcomeScreen } from "@excalidraw/excalidraw";
import { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";
import { AppState, NormalizedZoomValue } from "@excalidraw/excalidraw/types/types";
import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { Id } from "../convex/_generated/dataModel";

interface WhiteboardProps {
  boardId: Id<"boards">;
  onClose: () => void;
}

const DEFAULT_ELEMENT_PROPS = {
  groupIds: [],
  frameId: null,
  boundElements: null,
  updated: Date.now(),
  link: null,
  locked: false,
  customData: {},
} as const;

export function Whiteboard({ boardId, onClose }: WhiteboardProps) {
  const board = useQuery(api.board.get, { boardId });
  const updateElements = useMutation(api.board.updateElements);
  const updateViewState = useMutation(api.board.updateViewState);
  const updateBoardName = useMutation(api.board.updateName);
  const [excalidrawAPI, setExcalidrawAPI] = useState<any>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showHeader, setShowHeader] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState("");
  const [mouseY, setMouseY] = useState(0);
  const [updateTimeout, setUpdateTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (board) {
      setNewName(board.name);
    }
  }, [board?.name]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseY(e.clientY);
      setShowHeader(e.clientY < 100);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (!board || !excalidrawAPI) return;

    excalidrawAPI.updateScene({
      elements: board.elements.map(el => ({
        ...DEFAULT_ELEMENT_PROPS,
        ...el,
        roundness: { type: 1 },
        seed: 1,
        version: 1,
        versionNonce: 1,
        strokeStyle: "solid",
      })) as unknown as ExcalidrawElement[],
      appState: {
        ...excalidrawAPI.getAppState(),
        scrollX: board.viewState.scrollX,
        scrollY: board.viewState.scrollY,
        zoom: { value: board.viewState.zoom as NormalizedZoomValue },
        theme: window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light",
      },
    });
  }, [board, excalidrawAPI]);

  const onChange = async (elements: readonly ExcalidrawElement[], appState: AppState) => {
    if (!boardId) return;

    // Clear existing timeout
    if (updateTimeout) {
      clearTimeout(updateTimeout);
    }

    // Set new timeout
    const timeoutId = setTimeout(async () => {
      try {
        await updateElements({
          boardId,
          elements: elements.map(el => ({
            id: el.id,
            type: el.type,
            x: el.x,
            y: el.y,
            width: el.width,
            height: el.height,
            angle: el.angle,
            strokeColor: el.strokeColor,
            backgroundColor: el.backgroundColor,
            fillStyle: el.fillStyle,
            strokeWidth: el.strokeWidth,
            roughness: el.roughness,
            opacity: el.opacity,
            text: "text" in el ? el.text : undefined,
            font: "font" in el ? (el as any).font : undefined,
            fontSize: "fontSize" in el ? (el as any).fontSize : undefined,
            textAlign: "textAlign" in el ? (el as any).textAlign : undefined,
            locked: el.locked,
            visible: !el.isDeleted,
            version: el.version,
            isDeleted: el.isDeleted,
          })),
        });

        await updateViewState({
          boardId,
          viewState: {
            scrollX: appState.scrollX,
            scrollY: appState.scrollY,
            zoom: appState.zoom.value as number,
          },
        });
      } catch (error) {
        console.error("Failed to update board:", error);
        // Optionally show an error message to the user
        if ((error as Error).message === "Not authenticated") {
          onClose(); // Return to board list if authentication is lost
        }
      }
    }, 1000);

    setUpdateTimeout(timeoutId);
  };

  const handleNameSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!boardId || !newName || newName === board?.name) {
      setIsEditingName(false);
      return;
    }

    try {
      await updateBoardName({ boardId, name: newName });
      setIsEditingName(false);
    } catch (error) {
      console.error("Failed to update board name:", error);
      if ((error as Error).message === "Not authenticated") {
        onClose();
      }
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  if (!board) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <div 
        className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
          showHeader || isEditingName ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <div className="flex flex-col">
              <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
                SkyeDraw
              </h2>
              {isEditingName ? (
                <form onSubmit={handleNameSubmit} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="px-2 py-1 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    autoFocus
                    onBlur={handleNameSubmit}
                  />
                </form>
              ) : (
                <h3 
                  className="text-lg text-gray-700 dark:text-gray-300 cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400"
                  onClick={() => setIsEditingName(true)}
                >
                  {board.name}
                </h3>
              )}
            </div>
          </div>
          <button
            onClick={toggleFullscreen}
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            {isFullscreen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            )}
          </button>
        </div>
      </div>
      <div className="flex-1 bg-white dark:bg-gray-900">
        <Excalidraw
          onChange={onChange}
          excalidrawAPI={(api) => setExcalidrawAPI(api)}
          initialData={{
            elements: board.elements.map(el => ({
              ...DEFAULT_ELEMENT_PROPS,
              ...el,
              roundness: { type: 1 },
              seed: 1,
              version: 1,
              versionNonce: 1,
              strokeStyle: "solid",
            })) as unknown as ExcalidrawElement[],
            appState: {
              viewBackgroundColor: "#ffffff",
              currentItemStrokeColor: "#000000",
              currentItemBackgroundColor: "#ffffff",
              scrollX: board.viewState.scrollX,
              scrollY: board.viewState.scrollY,
              zoom: { value: board.viewState.zoom as NormalizedZoomValue },
              theme: window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light",
            },
          }}
          theme={window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light"}
        >
          <MainMenu>
            <MainMenu.DefaultItems.ClearCanvas />
            <MainMenu.DefaultItems.SaveAsImage />
            <MainMenu.DefaultItems.Export />
          </MainMenu>
          <WelcomeScreen />
        </Excalidraw>
      </div>
    </div>
  );
}
