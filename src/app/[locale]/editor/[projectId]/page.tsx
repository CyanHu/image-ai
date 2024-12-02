"use client";

import { useEffect, useState } from "react";
import Editor from "@/components/Editor";
import { Loader, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { useTranslations } from 'next-intl';
import { useParams } from "next/navigation";

interface CanvasState {
  json: string;
  width: number;
  height: number;
}

const DEFAULT_CANVAS_STATE: CanvasState = {
  json: "",
  width: 900,
  height: 1200,
};

const EditorProjectIdPage = () => {
  const t = useTranslations('Editor');
  const params = useParams();
  const locale = params.locale as string;
  const [state, setState] = useState<{
    data: CanvasState | null;
    isLoading: boolean;
    isError: boolean;
  }>({
    data: null,
    isLoading: true,
    isError: false,
  });

  useEffect(() => {
    try {
      const data = localStorage.getItem('canvas_state');
      setState({
        data: data ? JSON.parse(data) : DEFAULT_CANVAS_STATE,
        isLoading: false,
        isError: false,
      });
    } catch (error) {
      setState({
        data: null,
        isLoading: false,
        isError: true,
      });
    }
  }, []);

  if (state.isLoading || !state.data) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <Loader className="size-6 animate-spin text-muted-foreground" />
        <p className="text-muted-foreground text-sm mt-2">
          {t('loading')}
        </p>
      </div>
    );
  }

  if (state.isError) {
    return (
      <div className="h-full flex flex-col gap-y-5 items-center justify-center">
        <TriangleAlert className="size-6 text-muted-foreground" />
        <p className="text-muted-foreground text-sm">
          {t('error')}
        </p>
        <Button asChild variant="secondary">
          <Link href="/" locale={locale}>
            {t('backToHome')}
          </Link>
        </Button>
      </div>
    );
  }

  return <Editor initialData={state.data} />;
};

export default EditorProjectIdPage;
