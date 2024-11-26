import { Minimize, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "../ui/button";
import Hint from "./Hint";
import { Editor } from "./types";
import { useTranslations } from 'next-intl';

interface FooterProps {
  editor: Editor | undefined;
}

const Footer = ({ editor }: FooterProps) => {
  const t = useTranslations('Footer');
  
  return (
    <footer className="h-[52px] border-t bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-1 shrink-0 px-4 flex-row-reverse">
      <Hint label={t('reset')} side="top" sideOffset={10}>
        <Button
          onClick={() => editor?.autoZoom()}
          size="icon"
          variant="ghost"
          className="h-full"
        >
          <Minimize className="size-4" />
        </Button>
      </Hint>
      <Hint label={t('zoomIn')} side="top" sideOffset={10}>
        <Button
          onClick={() => editor?.zoomIn()}
          size="icon"
          variant="ghost"
          className="h-full"
        >
          <ZoomIn className="size-4" />
        </Button>
      </Hint>
      <Hint label={t('zoomOut')} side="top" sideOffset={10}>
        <Button
          onClick={() => editor?.zoomOut()}
          size="icon"
          variant="ghost"
          className="h-full"
        >
          <ZoomOut className="size-4" />
        </Button>
      </Hint>
    </footer>
  );
};

export default Footer;
