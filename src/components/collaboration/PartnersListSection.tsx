import { faBookOpen } from "@fortawesome/free-solid-svg-icons/faBookOpen";
import { faGamepad } from "@fortawesome/free-solid-svg-icons/faGamepad";
import { faUsers } from "@fortawesome/free-solid-svg-icons/faUsers";
import { SvgIcon } from "@/components/ui/SvgIcon";

interface IconDef {
  icon: [number, number, string[], string, string | string[]];
}

const PARTNERS: Array<{ icon: IconDef; label: string }> = [
  { icon: faUsers, label: "Українські локалізатори" },
  { icon: faGamepad, label: "Game UA Team" },
  { icon: faBookOpen, label: "Локалізація UA" },
  { icon: faUsers, label: "Українські перекладачі" },
  { icon: faGamepad, label: "UA Gaming Hub" },
  { icon: faBookOpen, label: "Локалізація UA" },
  { icon: faUsers, label: "Українські локалізатори" },
];

export function PartnersListSection() {
  const items = [...PARTNERS, ...PARTNERS];

  return (
    <section className="collab-partners">
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
