import * as React from "react";
import { fabric } from "fabric";
import useAutoResize from "./use-auto-resize";
import {
  BuildEditorProps,
  CIRCLE_OPTIONS,
  DIAMOND_OPTIONS,
  Editor,
  RECTANGLE_OPTIONS,
  TRIANGLE_OPTIONS,
} from "./types";

const buildEditor = ({ canvas }: BuildEditorProps): Editor => {
  const getWorkspace = () => {
    return canvas.getObjects().find((object) => object.name === "clip");
  };

  const center = (object: fabric.Object) => {
    const workspace = getWorkspace();
    const center = workspace?.getCenterPoint();

    if (!center) return;

    // @ts-ignore
    canvas._centerObject(object, center);
  };

  const addToCanvas = (object: fabric.Object) => {
    center(object);
    canvas.add(object);
    canvas.setActiveObject(object);
  };

  return {
    addCircle: () => {
      const object = new fabric.Circle({ ...CIRCLE_OPTIONS });
      addToCanvas(object);
    },
    addSoftRectangle: () => {
      const object = new fabric.Rect({ ...RECTANGLE_OPTIONS, rx: 50, ry: 50 });
      addToCanvas(object);
    },
    addRectangle: () => {
      const object = new fabric.Rect({ ...RECTANGLE_OPTIONS });
      addToCanvas(object);
    },
    addTriangle: () => {
      const object = new fabric.Triangle({ ...TRIANGLE_OPTIONS });
      addToCanvas(object);
    },
    addInverseTriangle: () => {
      const height = TRIANGLE_OPTIONS.height;
      const width = TRIANGLE_OPTIONS.width;

      const object = new fabric.Polygon(
        [
          { x: 0, y: 0 },
          { x: width, y: 0 },
          { x: width / 2, y: height },
        ],
        {
          ...TRIANGLE_OPTIONS,
        }
      );

      addToCanvas(object);
    },
    addDiamond: () => {
      const height = DIAMOND_OPTIONS.height;
      const width = DIAMOND_OPTIONS.width;

      const object = new fabric.Polygon(
        [
          { x: width / 2, y: 0 },
          { x: width, y: height / 2 },
          { x: width / 2, y: height },
          { x: 0, y: height / 2 },
        ],
        {
          ...DIAMOND_OPTIONS,
        }
      );
      addToCanvas(object);
    },
  };
};

export const useEditor = () => {
  const [canvas, setCanvas] = React.useState<fabric.Canvas | null>(null);
  const [container, setContainer] = React.useState<HTMLDivElement | null>(null);
  useAutoResize({
    canvas,
    container,
  });

  const editor = React.useMemo(() => {
    if (canvas) {
      return buildEditor({ canvas });
    }

    return undefined;
  }, [canvas]);

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
    },
    []
  );
  return { init, editor };
};
