import * as React from "react";
import { fabric } from "fabric";
import useAutoResize from "./use-auto-resize";

export const useEditor = () => {
  const [canvas, setCanvas] = React.useState<fabric.Canvas | null>(null);
  const [container, setContainer] = React.useState<HTMLDivElement | null>(null);
  useAutoResize({
    canvas,
    container,
  });
  const init = React.useCallback(
    ({
      initialCanvas,
      initialContainer,
    }: {
      initialCanvas: fabric.Canvas;
      initialContainer: HTMLDivElement;
    }) => {
      fabric.Object.prototype.set({
        cornerColor: "#FFF",
        cornerStyle: "circle",
        borderColor: "#3b82f6",
        borderScaleFactor: 1.5,
        transparentCorners: false,
        borderOpacityWhenMoving: 1,
        cornerStrokeColor: "#3b82f6",
      });

      const initialWorkspace = new fabric.Rect({
        width: 900,
        height: 1200,
        name: "clip",
        fill: "white",
        selectable: false,
        hasControls: false,
        shadow: new fabric.Shadow({
          color: "rgba(0,0,0,0.8)",
          blur: 5,
        }),
      });

      initialCanvas.setWidth(initialContainer.offsetHeight);
      initialCanvas.setHeight(initialContainer.offsetWidth);
      initialCanvas.add(initialWorkspace);
      initialCanvas.centerObject(initialWorkspace);
      initialCanvas.clipPath = initialWorkspace;

      setCanvas(initialCanvas);
      setContainer(initialContainer);

      const testRect = new fabric.Rect({
        width: 100,
        height: 100,
        fill: "black",
      });

      initialCanvas.add(testRect);
      initialCanvas.centerObject(testRect);
    },
    []
  );
  return { init };
};
