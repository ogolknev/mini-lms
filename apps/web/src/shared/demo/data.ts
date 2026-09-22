// Fictional, public portfolio fixtures. No customer content or credentials.
import type { Course } from '@/entities/course/model/interface'
import type { Lesson } from '@/entities/lesson/model/interface'
import type { User } from '@/entities/user/model/interface'

export function createDemoData() {
  const asset = (name: string) => `${import.meta.env.BASE_URL}demo/${name}`
  const preview = (name: string) => ({ url: asset(name), mime: 'image/svg+xml', name })
  const demoCourse: Course = {
    documentId: 'responsive-layout',
    title: 'Адаптивная вёрстка',
    description:
      'Тестовый мини-курс: от сетки страницы до проверки на телефоне. Откройте список уроков, посмотрите видео и скачайте чек-лист. Все материалы созданы для демонстрации платформы.',
    preview: preview('course.svg'),
  }
  const content = [
    [
      'grid',
      'Сетка страницы',
      'Собираем структуру, которая подстраивается под экран.',
      `## Начните с содержимого
Разделите страницу на шапку, основную часть и подвал. Для контейнера задайте максимальную ширину и боковые отступы.

\`\`\`css
.container {
  width: min(100% - 2rem, 70rem);
  margin-inline: auto;
}
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr));
  gap: 1rem;
}
\`\`\`

### Попробуйте
Измените ширину окна. Карточки должны переходить на новую строку без горизонтальной прокрутки.`,
    ],
    [
      'media',
      'Изображения и текст',
      'Сохраняем пропорции изображений и читаемость текста.',
      `## Изображения без искажений
Укажите размеры или соотношение сторон, чтобы зарезервировать место до загрузки. Для обложек используйте \`object-fit: cover\`.

\`\`\`css
.cover {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}
\`\`\`

### Проверьте текст
Длинные названия не должны выходить за карточку. Размер основного текста должен оставаться удобным для чтения на телефоне.`,
    ],
    [
      'check',
      'Проверка на телефоне',
      'Проверяем переходы, формы и узкие экраны.',
      `## Перед публикацией
- Проверьте страницу на ширине 360, 768 и 1440 пикселей.
- Пройдите все ссылки и кнопки с клавиатуры.
- Проверьте пустые данные, загрузку и ошибку запроса.
- Убедитесь, что форма объясняет ошибку рядом с полем.
- Откройте страницу по прямой ссылке и обновите её.

### Итог
Скачайте чек-лист под описанием урока. Он помогает повторить проверку после изменений.`,
    ],
  ]
  const demoLessons: Lesson[] = content.map(([id, title, description, text], index) => ({
    documentId: id!,
    title: title!,
    description: description!,
    content: text!,
    position: index + 1,
    course: { ...demoCourse },
    preview: preview(`${id}.svg`),
    heroSrcType: 'demo-video',
    heroUrl: asset('lesson-demo.mp4'),
    attachments: [
      {
        url: asset('layout-checklist.txt'),
        name: 'Чек-лист адаптивной страницы.txt',
        mime: 'text/plain',
      },
    ],
  }))
  demoCourse.lessons = demoLessons
  const demoUser: User = {
    id: 1,
    documentId: 'demo-student',
    username: 'demo',
    name: 'Демо-ученик',
    email: 'demo@example.invalid',
    provider: 'demo',
    confirmed: true,
    blocked: false,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
    courses: [demoCourse],
  }

  return { demoCourse, demoLessons, demoUser }
}
