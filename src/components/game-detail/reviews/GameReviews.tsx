import type { Game } from "@/lib/types";
import { GameReviewsFilter } from "./GameReviewsFilter";
import { GameReviewsHeader } from "./GameReviewsHeader";
import { ReviewList } from "./ReviewList";

interface GameReviewsProps {
  game: Game;
}

export function GameReviews({ game }: GameReviewsProps) {
  return (
    <section id="reviews" className="game-section game-reviews">
      <GameReviewsHeader
        count={game.reviews}
        gameSlug={game.slug}
        team={game.team}
      />

      <GameReviewsFilter
        reviews={game.reviews}
        errorReviews={game.error_reviews}
        lists={{
          all: <ReviewList gameId={game.id} />,
          feedback: game.reviews > 0 && (
            <ReviewList gameId={game.id} type="feedback" />
          ),
          error: game.reviews > 0 && (
            <ReviewList gameId={game.id} type="error" />
          ),
        }}
      />
    </section>
  );
}
