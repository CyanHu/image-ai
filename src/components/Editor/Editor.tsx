"use client";

import * as React from "react";
import { useEditor } from "@/components/Editor/use-editor";
import { fabric } from "fabric";
import Navbar from "./Navbar";
import Sidebar from "./Siderbar";
import Toolbar from "./Toolbar";
import Footer from "./Footer";
import { ActiveTool } from "./types";

function Editor() {
  const [activeTool, setActiveTool] = React.useState<ActiveTool>("select");

  const onChangeActiveTool = React.useCallback(
    (tool: ActiveTool) => {
      if (tool === activeTool) {
        return setActiveTool("select");
      }

      setActiveTool(tool);
    },
    [activeTool]
  );

  const { init } = useEditor();

  const canvasRef = React.useRef(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      controlsAboveOverlay: true,
      preserveObjectStacking: true,
    });

    init({ initialCanvas: canvas, initialContainer: containerRef.current! });

    return () => {
      canvas.dispose();
    };
  }, [init]);

  return (
    <div className="h-full flex flex-col">
      <Navbar activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} />
      <div className="absolute h-[calc(100%-68px)] w-full top-[68px] flex">
        <Sidebar
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <main className="bg-muted flex-1 overflow-auto relative flex flex-col">
          <Toolbar />
          <div
            className="flex-1 h-[calc(100%-124px)] bg-muted"
            ref={containerRef}
          >
            <canvas ref={canvasRef} />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}

export default Editor;
