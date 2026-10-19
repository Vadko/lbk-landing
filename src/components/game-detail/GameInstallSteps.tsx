import { getTranslations } from "next-intl/server";

interface GameInstallStepsProps {
  gameName: string;
  /** Steam installs a Workshop translation itself — the launcher only informs here */
  isWorkshop?: boolean;
}

export async function GameInstallSteps({
  gameName,
  isWorkshop = false,
}: GameInstallStepsProps) {
  const t = await getTranslations("gameInstall");
  const kind = isWorkshop ? "workshop" : "launcher";
  const b = (chunks: React.ReactNode) => <strong>{chunks}</strong>;

  return (
    <section className="game-section game-install-section">
      <h2>{t("title", { game: gameName })}</h2>
      <ol className="game-install-steps">
        <li>{t.rich("download", { kind, b })}</li>
        <li>{t.rich("find", { game: gameName, kind, b })}</li>
        <li>{t.rich("install", { kind, b })}</li>
        <li>{t.rich("play", { b })}</li>
      </ol>
    </section>
  );
}
