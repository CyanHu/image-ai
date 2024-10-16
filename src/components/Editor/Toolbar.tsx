import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import Hint from "./Hint";
import { ActiveTool } from "./types";
import * as React from "react";

interface ToolbarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

const Toolbar = ({ editor, activeTool, onChangeActiveTool }: ToolbarProps) => {
  const selectedObject = editor?.canvas.getActiveObject();

  const getProperty = (property: any) => {
    if (!selectedObject) return null;
    return selectedObject.get(property);
  };

  const fillColor = getProperty("fill");

  const [properties, setProperties] = React.useState({
    fillColor,
  });

  return (
    <div className="shrink-0 h-[56px] border-b bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2">
      <div className="flex items-center h-full justify-center">
        <Hint label="color" side="bottom" sideOffset={5}>
          <Button
            onClick={() => onChangeActiveTool("fill")}
            size="icon"
            variant="ghost"
            className={cn(activeTool === "fill" && "bg-gray-100")}
          >
            <div
              className="rounded-sm size-4 border"
              style={{
                backgroundColor:
                  typeof fillColor === "string" ? fillColor : "black",
              }}
            ></div>
          </Button>
        </Hint>
      </div>
    </div>
  );
};

export default Toolbar;
