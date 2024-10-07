"use client";

import * as React from "react";
import { useEditor } from "@/components/Editor/use-editor";
import { fabric } from "fabric";

function Editor() {
  const { init } = useEditor();

  const canvasRef = React.useRef(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      controlsAboveOverlay: true,
      preserveObjectStacking: true,
    });

    init({ initialCanvas: canvas, initialContainer: containerRef.current! });
  }, [init]);

  return (
    <div className="h-full flex">
      <div className="flex-1 h-full bg-muted" ref={containerRef}>
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}

export default Editor;
