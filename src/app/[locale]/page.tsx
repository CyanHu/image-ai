import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Paintbrush,
  BrainCircuit,
  Languages,
  DownloadCloud,
  Undo2,
  Save,
  CodeIcon,
  SettingsIcon,
  RocketIcon,
  ShieldCheckIcon,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from 'next-intl';

export default function Home({
  params: { locale }
}: {
  params: { locale: string }
}) {
  const t = useTranslations('Index');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-purple-900">
      {/* 导航栏 */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">
            {t('title')}
          </h1>
          <div className="flex items-center gap-6">
            <Link href="/" locale={locale === 'zh' ? 'en' : 'zh'}>
              <Button variant="ghost" className="text-white hover:bg-white/10">
                <Languages className="mr-2 h-4 w-4" />
                {locale === 'zh' ? 'EN/中' : '中/EN'}
              </Button>
            </Link>
            <Button variant="ghost" className="text-white hover:bg-white/10">
              GitHub
            </Button>
          </div>
        </div>
      </nav>

      {/* 主内容区 */}
      <main className="container mx-auto px-6 py-20">
        <div className="text-center mb-20">
          <h1 className="text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">
              {t('subtitle')}
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            {t('description')}
          </p>
          <Button
            size="lg"
            className="text-lg h-14 px-8 bg-blue-600 hover:bg-blue-700"
          >
            <Paintbrush className="mr-2 h-5 w-5" />
            <Link href={`/editor/123`}>{t('startCreating')}</Link>
          </Button>
        </div>
        {/* 核心功能卡片 */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {/* AI增强设计卡片 */}
          <Card className="bg-white/5 backdrop-blur-sm border-0">
            <CardHeader>
              <BrainCircuit className="h-12 w-12 text-purple-400 mb-4" />
              <CardTitle className="text-white">{t('aiDesign.title')}</CardTitle>
              <CardDescription className="text-gray-300 mb-6">
                {t('aiDesign.description')}
              </CardDescription>
              <div className="space-y-3 border-t border-white/10 pt-4">
                <div className="flex items-center text-sm text-white">
                  <RocketIcon className="h-4 w-4 text-purple-300 mr-2" />
                  <span>{t('aiDesign.features.imageGeneration')}</span>
                </div>
                <div className="flex items-center text-sm text-white">
                  <ShieldCheckIcon className="h-4 w-4 text-green-300 mr-2" />
                  <span>{t('aiDesign.features.backgroundRemoval')}</span>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* 专业画板卡片 */}
          <Card className="bg-white/5 backdrop-blur-sm border-0">
            <CardHeader>
              <Paintbrush className="h-12 w-12 text-blue-400 mb-4" />
              <CardTitle className="text-white">{t('professionalCanvas.title')}</CardTitle>
              <CardDescription className="text-gray-300 mb-6">
                {t('professionalCanvas.description')}
              </CardDescription>
              <div className="space-y-3 border-t border-white/10 pt-4">
                <div className="flex items-center text-sm text-white">
                  <Undo2 className="h-4 w-4 text-blue-300 mr-2" />
                  <span>{t('professionalCanvas.features.history')}</span>
                </div>
                <div className="flex items-center text-sm text-white">
                  <Save className="h-4 w-4 text-green-300 mr-2" />
                  <span>{t('professionalCanvas.features.autoSave')}</span>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* 多格式支持卡片 */}
          <Card className="bg-white/5 backdrop-blur-sm border-0">
            <CardHeader>
              <DownloadCloud className="h-12 w-12 text-green-400 mb-4" />
              <CardTitle className="text-white">{t('multiFormat.title')}</CardTitle>
              <CardDescription className="text-gray-300 mb-6">
                {t('multiFormat.description')}
              </CardDescription>
              <div className="space-y-3 border-t border-white/10 pt-4">
                <div className="flex items-center text-sm text-white">
                  <Languages className="h-4 w-4 text-yellow-300 mr-2" />
                  <span>{t('multiFormat.features.i18n')}</span>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>
      </main>

      {/* 页脚 */}
      <footer className="border-t border-white/10 mt-20">
        <div className="container mx-auto px-6 py-8 text-center text-gray-400">
          <p>{t('footer.copyright')}</p>
        </div>
      </footer>
    </div>
  );
}
