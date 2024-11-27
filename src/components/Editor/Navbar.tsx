import { Button } from "@/components/ui/button";
import { CiFileOn } from "react-icons/ci";
import Logo from "./Logo";
import Hint from "./Hint";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  Download,
  MousePointerClick,
  Redo2,
  Undo2,
  Languages,
} from "lucide-react";
import { Separator } from "../ui/separator";
import { BsCloudCheck } from "react-icons/bs";
import { ActiveTool, Editor } from "./types";
import { cn } from "@/lib/utils";
import { useFilePicker } from "use-file-picker";
import { useTranslations } from 'next-intl';
import { Link } from "@/i18n/navigation";
import { useParams } from "next/navigation";

interface NavbarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor | undefined;
  locale: string;
}

const Navbar = ({ activeTool, onChangeActiveTool, editor, locale }: NavbarProps) => {
  const t = useTranslations('Navbar');
  const { openFilePicker } = useFilePicker({
    accept: ".json",
    onFilesSuccessfullySelected: ({ plainFiles }: any) => {
      if (plainFiles && plainFiles.length > 0) {
        const file = plainFiles[0];
        const reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = () => {
          editor?.loadJson(reader.result as string);
        };
      }
    },
  });
  const params = useParams();
  return (
    <nav className="h-[68px] flex items-center w-full border-b gap-x-8 lg:pl-[34px] p-4">
      <Logo />
      <div className="w-full flex items-center gap-x-1 h-full">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="ghost">
              {t('file')}
              <ChevronDown className="size-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="min-w-60">
            <DropdownMenuItem
              className="flex items-center gap-x-2"
              onClick={() => openFilePicker()}
            >
              <CiFileOn className="size-8" />
              <div>
                <p>{t('open')}</p>
                <p className="text-xs text-muted-foreground">
                  {t('openDescription')}
                </p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Separator orientation="vertical" className="mx-2" />
        <Hint label={t('select')} side="bottom" sideOffset={10}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onChangeActiveTool("select")}
            className={cn(activeTool === "select" && "bg-gray-100")}
          >
            <MousePointerClick className="size-4" />
          </Button>
        </Hint>
        <Hint label={t('undo')} side="bottom" sideOffset={10}>
          <Button
            variant="ghost"
            size="icon"
            onClick={editor?.onUndo}
            disabled={!editor?.canUndo()}
          >
            <Undo2 className="size-4" />
          </Button>
        </Hint>
        <Hint label={t('redo')} side="bottom" sideOffset={10}>
          <Button
            variant="ghost"
            size="icon"
            onClick={editor?.onRedo}
            disabled={!editor?.canRedo()}
          >
            <Redo2 className="size-4" />
          </Button>
        </Hint>
        <Separator orientation="vertical" className="mx-2" />
        <div className="flex items-center gap-x-2">
          <BsCloudCheck className="size-[20px] text-muted-foreground" />
          <div className="text-xs text-muted-foreground">{t('saved')}</div>
        </div>
      </div>
      <div className="ml-auto flex items-center gap-x-4">
        <Link href={`/editor/${params.projectId}`} locale={locale === 'zh' ? 'en' : 'zh'}>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            {locale === 'zh' ? 'EN/中' : '中/EN'}
            <Languages className="h-4 w-4 ml-2" />
          </Button>
        </Link>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="ghost">
              {t('export')}
              <Download className="size-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-60">
            <DropdownMenuItem
              className="flex items-center gap-x-2"
              onClick={() => editor?.saveJson()}
            >
              <CiFileOn className="size-8" />
              <div>
                <p>{t('exportFormats.json.title')}</p>
                <p className="text-xs text-muted-foreground">
                  {t('exportFormats.json.description')}
                </p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center gap-x-2"
              onClick={() => editor?.savePng()}
            >
              <CiFileOn className="size-8" />
              <div>
                <p>{t('exportFormats.png.title')}</p>
                <p className="text-xs text-muted-foreground">
                  {t('exportFormats.png.description')}
                </p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center gap-x-2"
              onClick={() => editor?.saveJpg()}
            >
              <CiFileOn className="size-8" />
              <div>
                <p>{t('exportFormats.jpg.title')}</p>
                <p className="text-xs text-muted-foreground">
                  {t('exportFormats.jpg.description')}
                </p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center gap-x-2"
              onClick={() => editor?.saveSvg()}
            >
              <CiFileOn className="size-8" />
              <div>
                <p>{t('exportFormats.svg.title')}</p>
                <p className="text-xs text-muted-foreground">
                  {t('exportFormats.svg.description')}
                </p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;
