import { cn } from "@/lib/utils";
import React from "react";
import { ActiveTool, Editor } from "./types";
import ToolSidebarHeader from "./ToolSidebarHeader";
import ToolSidebarClose from "./ToolSidebarClose";
import { ScrollArea } from "../ui/scroll-area";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useGenerateImage } from "./use-generate-image";

interface AISidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

const AISidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: AISidebarProps) => {
  const mutation = useGenerateImage();

  const [value, setValue] = React.useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutation.mutateAsync({ prompt: value }).then(({ data }) => {
      editor?.addImage(data);
    });
  };
  const onClose = () => {
    onChangeActiveTool("select");
  };

  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "ai" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader title="AI" description="Generate an image using AI" />
      <ScrollArea>
        <form className="p-4 space-y-6" onSubmit={onSubmit}>
          <Textarea
            placeholder="an astronaut riding a horse on mars, hd, dramatic lighting"
            cols={30}
            rows={10}
            required
            minLength={3}
            onChange={(e) => setValue(e.target.value)}
            value={value}
            disabled={mutation.isPending}
          />
          <Button
            type="submit"
            className="w-full"
            disabled={mutation.isPending}
          >
            Generate
          </Button>
        </form>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};

export default AISidebar;
