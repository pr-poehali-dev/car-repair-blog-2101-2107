import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface Comment {
  id: number;
  author: string;
  text: string;
  date: string;
}

interface Article {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  content: string;
  comments: Comment[];
}

export default function Index() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [commentText, setCommentText] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');

  const articles: Article[] = [
    {
      id: 1,
      title: 'Полная замена тормозных колодок на ВАЗ 2107',
      excerpt: 'Пошаговая инструкция по замене передних и задних тормозных колодок своими руками',
      category: 'Ремонт',
      date: '20 ноября 2025',
      image: 'https://cdn.poehali.dev/projects/f652a6d2-4605-4659-9705-2d63dd6160bf/files/794dbd5c-6466-4d5d-a278-5378b153d6dc.jpg',
      content: 'Замена тормозных колодок - одна из самых важных процедур обслуживания автомобиля. В этой статье мы подробно разберем, как правильно заменить колодки на ВАЗ 2107.',
      comments: [
        { id: 1, author: 'Сергей М.', text: 'Отличная инструкция! Поменял за час.', date: '21 ноября 2025' }
      ]
    },
    {
      id: 2,
      title: 'Как улучшить шумоизоляцию салона',
      excerpt: 'Простые способы сделать поездку комфортнее без больших затрат',
      category: 'Лайфхаки',
      date: '18 ноября 2025',
      image: 'https://cdn.poehali.dev/projects/f652a6d2-4605-4659-9705-2d63dd6160bf/files/f59e38ee-6eb0-41f9-b1b3-d4c55e02ab2c.jpg',
      content: 'Шумоизоляция - это то, что может кардинально изменить ваши впечатления от вождения классики. Рассмотрим доступные материалы и методы.',
      comments: []
    },
    {
      id: 3,
      title: 'Регулировка карбюратора ДААЗ 2107',
      excerpt: 'Настройка карбюратора для оптимальной работы двигателя',
      category: 'Ремонт',
      date: '15 ноября 2025',
      image: 'https://cdn.poehali.dev/projects/f652a6d2-4605-4659-9705-2d63dd6160bf/files/a0de33d8-8a51-46f6-9be9-748c6db4d139.jpg',
      content: 'Правильная настройка карбюратора критична для стабильной работы двигателя. Разберем все этапы регулировки.',
      comments: [
        { id: 1, author: 'Андрей К.', text: 'Спасибо за подсказки по холостому ходу!', date: '16 ноября 2025' },
        { id: 2, author: 'Владимир П.', text: 'А можно подробнее про жиклеры?', date: '17 ноября 2025' }
      ]
    },
    {
      id: 4,
      title: 'Зимнее хранение автомобиля',
      excerpt: 'Подготовка классики к длительной стоянке в холодное время года',
      category: 'Лайфхаки',
      date: '12 ноября 2025',
      image: 'https://cdn.poehali.dev/projects/f652a6d2-4605-4659-9705-2d63dd6160bf/files/f59e38ee-6eb0-41f9-b1b3-d4c55e02ab2c.jpg',
      content: 'Правильная подготовка к зимнему хранению поможет сохранить автомобиль в отличном состоянии до весны.',
      comments: []
    }
  ];

  const handleAddComment = () => {
    if (!selectedArticle || !commentText || !commentAuthor) return;
    
    const newComment: Comment = {
      id: selectedArticle.comments.length + 1,
      author: commentAuthor,
      text: commentText,
      date: new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
    };
    
    selectedArticle.comments.push(newComment);
    setCommentText('');
    setCommentAuthor('');
  };

  const renderArticleView = (article: Article) => (
    <div className="animate-fade-in">
      <Button 
        variant="ghost" 
        onClick={() => setSelectedArticle(null)}
        className="mb-6"
      >
        <Icon name="ArrowLeft" size={20} className="mr-2" />
        Назад к статьям
      </Button>

      <article className="max-w-4xl mx-auto">
        <Badge className="mb-4">{article.category}</Badge>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{article.title}</h1>
        <p className="text-muted-foreground mb-6 flex items-center gap-2">
          <Icon name="Calendar" size={16} />
          {article.date}
        </p>
        
        <img 
          src={article.image} 
          alt={article.title}
          className="w-full h-[400px] object-cover rounded-lg mb-8"
        />
        
        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-lg leading-relaxed">{article.content}</p>
        </div>

        <Separator className="my-8" />

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Icon name="MessageSquare" size={24} />
            Комментарии ({article.comments.length})
          </h2>
          
          <div className="space-y-4 mb-8">
            {article.comments.map((comment) => (
              <Card key={comment.id} className="animate-scale-in">
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <Avatar>
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {comment.author.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold">{comment.author}</span>
                        <span className="text-sm text-muted-foreground">{comment.date}</span>
                      </div>
                      <p className="text-foreground">{comment.text}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Оставить комментарий</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Input 
                  placeholder="Ваше имя"
                  value={commentAuthor}
                  onChange={(e) => setCommentAuthor(e.target.value)}
                />
              </div>
              <div>
                <Textarea 
                  placeholder="Ваш комментарий"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  rows={4}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleAddComment} className="w-full">
                <Icon name="Send" size={16} className="mr-2" />
                Отправить
              </Button>
            </CardFooter>
          </Card>
        </div>
      </article>
    </div>
  );

  const renderHome = () => (
    <div className="animate-fade-in">
      <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-2xl p-12 mb-12 relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Классика живёт!
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Всё о ремонте и обслуживании ВАЗ 2101-2107
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            className="text-lg"
            onClick={() => setActiveSection('articles')}
          >
            Читать статьи
            <Icon name="ArrowRight" size={20} className="ml-2" />
          </Button>
        </div>
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <Card className="cursor-pointer transition-transform hover:scale-105" onClick={() => setActiveSection('lifehacks')}>
          <CardHeader>
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Icon name="Lightbulb" size={24} className="text-primary" />
            </div>
            <CardTitle>Лайфхаки</CardTitle>
            <CardDescription>Полезные советы и хитрости для владельцев</CardDescription>
          </CardHeader>
        </Card>

        <Card className="cursor-pointer transition-transform hover:scale-105" onClick={() => setActiveSection('repair')}>
          <CardHeader>
            <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
              <Icon name="Wrench" size={24} className="text-secondary" />
            </div>
            <CardTitle>Ремонт</CardTitle>
            <CardDescription>Инструкции по ремонту своими руками</CardDescription>
          </CardHeader>
        </Card>

        <Card className="cursor-pointer transition-transform hover:scale-105" onClick={() => setActiveSection('contacts')}>
          <CardHeader>
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
              <Icon name="Mail" size={24} className="text-accent" />
            </div>
            <CardTitle>Контакты</CardTitle>
            <CardDescription>Свяжитесь с нами или поделитесь опытом</CardDescription>
          </CardHeader>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mb-6">Популярные статьи</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {articles.slice(0, 4).map((article) => (
          <Card 
            key={article.id} 
            className="cursor-pointer transition-transform hover:scale-[1.02] overflow-hidden group"
            onClick={() => setSelectedArticle(article)}
          >
            <div className="relative h-48 overflow-hidden">
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-full object-cover transition-transform group-hover:scale-110"
              />
              <Badge className="absolute top-4 left-4">{article.category}</Badge>
            </div>
            <CardHeader>
              <CardTitle className="line-clamp-2">{article.title}</CardTitle>
              <CardDescription>{article.excerpt}</CardDescription>
            </CardHeader>
            <CardFooter className="flex items-center justify-between text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Icon name="Calendar" size={14} />
                {article.date}
              </span>
              <span className="flex items-center gap-1">
                <Icon name="MessageSquare" size={14} />
                {article.comments.length}
              </span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderArticles = (category?: string) => {
    const filteredArticles = category 
      ? articles.filter(a => a.category === category)
      : articles;

    return (
      <div className="animate-fade-in">
        <h1 className="text-4xl font-bold mb-8">
          {category || 'Все статьи'}
        </h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <Card 
              key={article.id}
              className="cursor-pointer transition-transform hover:scale-[1.02] overflow-hidden group"
              onClick={() => setSelectedArticle(article)}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />
                <Badge className="absolute top-4 left-4">{article.category}</Badge>
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-2">{article.title}</CardTitle>
                <CardDescription>{article.excerpt}</CardDescription>
              </CardHeader>
              <CardFooter className="flex items-center justify-between text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Icon name="Calendar" size={14} />
                  {article.date}
                </span>
                <span className="flex items-center gap-1">
                  <Icon name="MessageSquare" size={14} />
                  {article.comments.length}
                </span>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const renderContacts = () => (
    <div className="animate-fade-in max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Контакты</h1>
      <Card>
        <CardHeader>
          <CardTitle>Свяжитесь с нами</CardTitle>
          <CardDescription>
            Есть вопросы или хотите поделиться своим опытом? Напишите нам!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Input placeholder="Ваше имя" />
          </div>
          <div>
            <Input type="email" placeholder="Email" />
          </div>
          <div>
            <Textarea placeholder="Сообщение" rows={6} />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">
            <Icon name="Send" size={16} className="mr-2" />
            Отправить
          </Button>
        </CardFooter>
      </Card>

      <div className="mt-8 grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <Icon name="Mail" size={24} className="text-primary mb-2" />
            <CardTitle className="text-lg">Email</CardTitle>
            <CardDescription>info@vaz-classic.ru</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <Icon name="Phone" size={24} className="text-primary mb-2" />
            <CardTitle className="text-lg">Телефон</CardTitle>
            <CardDescription>+7 (999) 123-45-67</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <Icon name="MapPin" size={24} className="text-primary mb-2" />
            <CardTitle className="text-lg">Адрес</CardTitle>
            <CardDescription>Москва, Россия</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div 
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => {
                setActiveSection('home');
                setSelectedArticle(null);
              }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="Car" size={24} className="text-white" />
              </div>
              <span className="text-xl font-bold">ВАЗ Классика</span>
            </div>
            
            <div className="hidden md:flex gap-6">
              <Button 
                variant={activeSection === 'home' ? 'default' : 'ghost'}
                onClick={() => {
                  setActiveSection('home');
                  setSelectedArticle(null);
                }}
              >
                Главная
              </Button>
              <Button 
                variant={activeSection === 'articles' ? 'default' : 'ghost'}
                onClick={() => {
                  setActiveSection('articles');
                  setSelectedArticle(null);
                }}
              >
                Статьи
              </Button>
              <Button 
                variant={activeSection === 'lifehacks' ? 'default' : 'ghost'}
                onClick={() => {
                  setActiveSection('lifehacks');
                  setSelectedArticle(null);
                }}
              >
                Лайфхаки
              </Button>
              <Button 
                variant={activeSection === 'repair' ? 'default' : 'ghost'}
                onClick={() => {
                  setActiveSection('repair');
                  setSelectedArticle(null);
                }}
              >
                Ремонт
              </Button>
              <Button 
                variant={activeSection === 'contacts' ? 'default' : 'ghost'}
                onClick={() => {
                  setActiveSection('contacts');
                  setSelectedArticle(null);
                }}
              >
                Контакты
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {selectedArticle ? (
          renderArticleView(selectedArticle)
        ) : (
          <>
            {activeSection === 'home' && renderHome()}
            {activeSection === 'articles' && renderArticles()}
            {activeSection === 'lifehacks' && renderArticles('Лайфхаки')}
            {activeSection === 'repair' && renderArticles('Ремонт')}
            {activeSection === 'contacts' && renderContacts()}
          </>
        )}
      </main>

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
    </div>
  );
}
