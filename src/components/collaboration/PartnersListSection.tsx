import { faBookOpen } from "@fortawesome/free-solid-svg-icons/faBookOpen";
import { faGamepad } from "@fortawesome/free-solid-svg-icons/faGamepad";
import { faUsers } from "@fortawesome/free-solid-svg-icons/faUsers";
import { SvgIcon } from "@/components/ui/SvgIcon";

interface IconDef {
  icon: [number, number, string[], string, string | string[]];
}

const PARTNERS: Array<{ icon: IconDef; label: string }> = [
  { icon: faUsers, label: "Кіндрат Книш" },
  { icon: faGamepad, label: "Народний переклад" },
  { icon: faBookOpen, label: "Солов’їна команда" },
  { icon: faUsers, label: "Jackbox Ukraine" },
  { icon: faGamepad, label: "Дракон Сходу" },
  { icon: faGamepad, label: "Ліниві ШІ" },
  { icon: faGamepad, label: "Ідіома" },
  { icon: faGamepad, label: "Спільнота Єнота" },
  { icon: faGamepad, label: "Sent_DeZ" },
  { icon: faGamepad, label: "Свічники" },
  { icon: faGamepad, label: "HamUA Studio" },
  { icon: faGamepad, label: "CatLocTeam" },
  { icon: faGamepad, label: "СТОЯТИ Team" },
  { icon: faGamepad, label: "cul33" },
  { icon: faGamepad, label: "Кавунові переклади" },
];

export function PartnersListSection() {
  const items = [...PARTNERS, ...PARTNERS];

  return (
    <section className="section-margin">
      <div className="container">
        <h2 className="section-title center">
          Спілки перекладачів, що вже з нами
        </h2>
      </div>

      <div className="collab-partners-ticker">
        <div className="collab-partners-track">
          {items.map((item, index) => (
            <div className="collab-partner-chip" key={`${item.label}-${index}`}>
              <div className="collab-partner-chip-icon">
                <SvgIcon icon={item.icon} />
              </div>
              <p>{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
