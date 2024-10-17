import { cn } from "@/lib/utils";
import {
  ActiveTool,
  Editor,
  FILL_COLOR,
  STROKE_COLOR,
  STROKE_DASH_ARRAY,
  STROKE_WIDTH,
} from "./types";
import ToolSidebarHeader from "./ToolSidebarHeader";
import ToolSidebarClose from "./ToolSidebarClose";
import { ScrollArea } from "../ui/scroll-area";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { Button } from "../ui/button";

interface StrokeWidthSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

const StrokeWidthSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: StrokeWidthSidebarProps) => {
  const widthValue = editor?.getActiveStrokeWidth() || STROKE_WIDTH;
  const typeValue = editor?.getActiveStrokeDashArray() || STROKE_DASH_ARRAY;
  const onClose = () => {
    onChangeActiveTool("select");
  };

  const onChangeStrokeWidth = (value: number) => {
    editor?.changeStrokeWidth(value);
  };
  const onChangeStrokeType = (value: number[]) => {
    editor?.changeStrokeDashArray(value);
  };

  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "stroke-width" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="stroke width"
        description="modify the stroke of your element"
      />
      <ScrollArea>
        <div className="p-4 space-y-4 border-b">
          <Label className="text-sm">Stroke width</Label>
          <Slider
            value={[widthValue]}
            onValueChange={(values) => onChangeStrokeWidth(values[0])}
          />
        </div>
        <div className="p-4 space-y-4 border-b">
          <Label className="text-sm">Stroke type</Label>
          <Button
            onClick={() => onChangeStrokeType([])}
            variant="secondary"
            size="lg"
            className={cn(
              "w-full h-16 justify-start text-left py-2 px-4",
              JSON.stringify(typeValue) === `[]` && "border-2 border-blue-500"
            )}
          >
            <div className="w-full border-black rounded-full border-4"></div>
          </Button>
          <Button
            onClick={() => onChangeStrokeType([5, 5])}
            variant="secondary"
            size="lg"
            className={cn(
              "w-full h-16 justify-start text-left py-2 px-4",
              JSON.stringify(typeValue) === `[5,5]` &&
                "border-2 border-blue-500"
            )}
          >
            <div className="w-full border-black rounded-full border-4 border-dashed"></div>
          </Button>
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};

export default StrokeWidthSidebar;
