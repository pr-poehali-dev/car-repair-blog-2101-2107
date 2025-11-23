import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface HeaderProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  onLogoClick: () => void;
}

export default function Header({ activeSection, onSectionChange, onLogoClick }: HeaderProps) {
  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={onLogoClick}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Icon name="Car" size={24} className="text-white" />
            </div>
            <span className="text-xl font-bold">ВАЗ Классика</span>
          </div>
          
          <div className="hidden md:flex gap-6">
            <Button 
              variant={activeSection === 'home' ? 'default' : 'ghost'}
              onClick={() => onSectionChange('home')}
            >
              Главная
            </Button>
            <Button 
              variant={activeSection === 'articles' ? 'default' : 'ghost'}
              onClick={() => onSectionChange('articles')}
            >
              Статьи
            </Button>
            <Button 
              variant={activeSection === 'lifehacks' ? 'default' : 'ghost'}
              onClick={() => onSectionChange('lifehacks')}
            >
              Лайфхаки
            </Button>
            <Button 
              variant={activeSection === 'repair' ? 'default' : 'ghost'}
              onClick={() => onSectionChange('repair')}
            >
              Ремонт
            </Button>
            <Button 
              variant={activeSection === 'contacts' ? 'default' : 'ghost'}
              onClick={() => onSectionChange('contacts')}
            >
              Контакты
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
