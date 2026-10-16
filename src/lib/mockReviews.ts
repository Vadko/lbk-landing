import type { GameReviewsPage } from "./types";

const MOCK_TOTAL = 262;
const HOUR_MS = 60 * 60 * 1000;
const TEXTS = [
  "Переклад дуже якісний. Діалоги читаються природно, а описи предметів зрозумілі. Рекомендую.",
  "Переклад чудовий. Шрифти гарні, інтерфейс читабельний. Рекомендую всім.",
  "Переклад майже ідеальний. Дрібних помилок не знайшла. Дякую перекладачам!",
  "Є кілька неточностей у квестових записах, але загалом грати дуже комфортно.",
  "Нарешті можна пройти гру рідною мовою. Дякую за роботу!",
];
const REPLIES = [
  "Дякуємо за відгук! Раді, що переклад вам сподобався.",
  "Дякуємо, що вказали на неточності. Виправимо в наступному оновленні.",
];

function replyCount(index: number): number {
  if (index % 7 === 0) {
    return 2;
  }
  return index % 3 === 0 ? 1 : 0;
}

export async function getMockReviews(
  gameId: string,
  page: number,
  pageSize: number
): Promise<GameReviewsPage> {
  await new Promise((resolve) => setTimeout(resolve, 400));

  const offset = (page - 1) * pageSize;
  const count = Math.max(0, Math.min(pageSize, MOCK_TOTAL - offset));
  const items = Array.from({ length: count }, (_, i) => {
    const index = offset + i;
    const createdAt = Date.now() - index * 7 * HOUR_MS;
    return {
      id: `${gameId}-${index}`,
      text: TEXTS[index % TEXTS.length],
      createdAt: new Date(createdAt).toISOString(),
      images: Array.from(
        { length: index % 4 },
        (_, n) => `https://picsum.photos/seed/${gameId}-${index}-${n}/1280/720`
      ),
      replies: Array.from({ length: replyCount(index) }, (_, r) => ({
        id: `${gameId}-${index}-reply-${r}`,
        text: REPLIES[(index + r) % REPLIES.length],
        createdAt: new Date(createdAt + (r + 1) * HOUR_MS).toISOString(),
      })),
    };
  });

  return { items, total: MOCK_TOTAL, pageSize };
}
