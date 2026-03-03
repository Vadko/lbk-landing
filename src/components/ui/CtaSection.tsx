import { HoverCard } from "./HoverCard";

interface CtaSectionProps {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  className?: string;
  external?: boolean;
}

export function CtaSection({
  title,
  description,
  buttonText,
  buttonHref,
  className = "",
  external = true,
}: CtaSectionProps) {
  return (
    <section className={`container cta-section ${className}`.trim()}>
      <HoverCard>
        <h2>{title}</h2>
        <p>{description}</p>
        <a
          href={buttonHref}
          {...(external && {
            target: "_blank",
            rel: "noopener noreferrer",
          })}
          className="btn-main btn--big cta-primary-btn"
        >
          {buttonText}
        </a>
      </HoverCard>
    </section>
  );
}
