import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

export default function Footer() {
  return (
    <footer className="bg-accent text-accent-foreground mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="Car" size={24} className="text-white" />
              </div>
              <span className="text-xl font-bold">ВАЗ Классика</span>
            </div>
            <p className="text-sm opacity-80">
              Сообщество любителей классических автомобилей ВАЗ 2101-2107
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-4">Разделы</h3>
            <div className="space-y-2 text-sm">
              <div className="cursor-pointer hover:text-primary transition-colors">Статьи</div>
              <div className="cursor-pointer hover:text-primary transition-colors">Лайфхаки</div>
              <div className="cursor-pointer hover:text-primary transition-colors">Ремонт</div>
              <div className="cursor-pointer hover:text-primary transition-colors">Контакты</div>
            </div>
          </div>
          <div>
            <h3 className="font-bold mb-4">Следите за нами</h3>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-background/10 rounded-lg flex items-center justify-center cursor-pointer hover:bg-background/20 transition-colors">
                <Icon name="Facebook" size={20} />
              </div>
              <div className="w-10 h-10 bg-background/10 rounded-lg flex items-center justify-center cursor-pointer hover:bg-background/20 transition-colors">
                <Icon name="Instagram" size={20} />
              </div>
              <div className="w-10 h-10 bg-background/10 rounded-lg flex items-center justify-center cursor-pointer hover:bg-background/20 transition-colors">
                <Icon name="Youtube" size={20} />
              </div>
            </div>
          </div>
        </div>
        <Separator className="my-8 opacity-20" />
        <div className="text-center text-sm opacity-60">
          © 2025 ВАЗ Классика. Все права защищены.
        </div>
      </div>
    </footer>
  );
}
