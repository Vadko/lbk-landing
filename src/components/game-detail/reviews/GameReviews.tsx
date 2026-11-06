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
          all: <ReviewList gameId={game.id} count={game.reviews} />,
          feedback: (
            <ReviewList
              gameId={game.id}
              count={game.reviews - game.error_reviews}
              type="feedback"
            />
          ),
          error: (
            <ReviewList
              gameId={game.id}
              count={game.error_reviews}
              type="error"
            />
          ),
        }}
      />
    </section>
  );
}
