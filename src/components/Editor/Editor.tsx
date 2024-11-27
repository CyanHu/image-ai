"use client";

import * as React from "react";
import { useEditor } from "@/components/Editor/use-editor";
import { fabric } from "fabric";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Toolbar from "./Toolbar";
import Footer from "./Footer";
import { ActiveTool, selectionDependentTools } from "./types";
import ShapeSidebar from "./ShapeSidebar";
import FillColorSidebar from "./FillColorSidebar";
import StrokeColorSidebar from "./StrokeColorSidebar";
import StrokeWidthSidebar from "./StrokeWidthSidebar";
import OpacitySidebar from "./OpacitySidebar";
import TextSidebar from "./TextSidebar";
import FontSidebar from "./FontSidebar";
import ImageSidebar from "./ImageSidebar";
import FilterSidebar from "./FilterSidebar";
import AISidebar from "./AISidebar";
import RemoveBGSidebar from "./RemoveBgSidebar";
import DrawSidebar from "./DrawSidebar";
import SettingsSidebar from "./SettingsSidebar";
import { useTranslations } from 'next-intl';
import { useParams } from "next/navigation";

function Editor() {
  const t = useTranslations('Editor');
  const params = useParams();
  const locale = params.locale as string;
  const [activeTool, setActiveTool] = React.useState<ActiveTool>("select");

  const onClearSelection = React.useCallback(() => {
    if (selectionDependentTools.includes(activeTool)) {
      setActiveTool("select");
    }
  }, [activeTool]);

  const { init, editor } = useEditor({
    clearSelectionCallback: onClearSelection,
  });

  const onChangeActiveTool = React.useCallback(
    (tool: ActiveTool) => {
      if (tool === "draw") {
        editor?.enableDrawingMode();
      }

      if (activeTool === "draw") {
        editor?.disableDrawingMode();
      }
      if (tool === activeTool) {
        return setActiveTool("select");
      }

      setActiveTool(tool);
    },
    [activeTool, editor]
  );

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
      <Navbar
        activeTool={activeTool}
        onChangeActiveTool={onChangeActiveTool}
        editor={editor}
        locale={locale}
      />
      <div className="absolute h-[calc(100%-68px)] w-full top-[68px] flex">
        <Sidebar
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <ShapeSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <FillColorSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <StrokeColorSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <StrokeWidthSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <OpacitySidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <TextSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <FontSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <ImageSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <FilterSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <AISidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <RemoveBGSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <DrawSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <SettingsSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <main className="bg-muted flex-1 overflow-auto relative flex flex-col">
          <Toolbar
            editor={editor}
            activeTool={activeTool}
            onChangeActiveTool={onChangeActiveTool}
            key={JSON.stringify(editor?.canvas.getActiveObject())}
          />
          <div
            className="flex-1 h-[calc(100%-124px)] bg-muted"
            ref={containerRef}
          >
            <canvas ref={canvasRef} aria-label={t('canvas')} />
          </div>
          <Footer editor={editor} />
        </main>
      </div>
    </div>
  );
}

export default Editor;
