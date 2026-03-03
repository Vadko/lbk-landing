interface PageHeroSectionProps {
  title: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  className?: string;
}

export function PageHeroSection({
  title,
  description,
  ctaText,
  ctaHref,
  className = "",
}: PageHeroSectionProps) {
  return (
    <section className={`container page-hero ${className}`}>
      <h1>{title}</h1>
      <p className="page-hero__description">{description}</p>
      <a
        href={ctaHref}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-main btn--big"
      >
        {ctaText}
      </a>
    </section>
  );
}
