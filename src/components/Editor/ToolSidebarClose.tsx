import { ChevronsLeft } from "lucide-react";
import { useTranslations } from 'next-intl';
import Hint from "./Hint";

interface ToolSidebarCloseProps {
  onClick: () => void;
}

const ToolSidebarClose = ({ onClick }: ToolSidebarCloseProps) => {
  const t = useTranslations('Common');
  
  return (
    <Hint label={t('close')} side="right">
      <button
        onClick={onClick}
        className="absolute -right-[1.80rem] h-[70px] bg-white top-1/2 transform -translate-y-1/2 flex items-center justify-center rounded-r-xl px-1 pr-2 border-r border-y group"
      >
        <ChevronsLeft className="size-4 text-black group-hover:opacity-50" />
      </button>
    </Hint>
  );
};

export default ToolSidebarClose;
