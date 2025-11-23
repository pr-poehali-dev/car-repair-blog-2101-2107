import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
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

interface ArticleViewProps {
  article: Article;
  onBack: () => void;
}

export default function ArticleView({ article, onBack }: ArticleViewProps) {
  const [commentText, setCommentText] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');

  const handleAddComment = () => {
    if (!commentText || !commentAuthor) return;
    
    const newComment: Comment = {
      id: article.comments.length + 1,
      author: commentAuthor,
      text: commentText,
      date: new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
    };
    
    article.comments.push(newComment);
    setCommentText('');
    setCommentAuthor('');
  };

  return (
    <div className="animate-fade-in">
      <Button 
        variant="ghost" 
        onClick={onBack}
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
}
