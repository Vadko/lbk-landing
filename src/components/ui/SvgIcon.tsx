interface IconDef {
  icon: [number, number, string[], string, string | string[]];
}

interface SvgIconProps {
  icon: IconDef;
  className?: string;
}

export function SvgIcon({ icon, className }: SvgIconProps) {
  const [width, height, , , path] = icon.icon;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${width} ${height}`}
      fill="currentColor"
      aria-hidden="true"
      className={className}
      style={{ width: "1em", height: "1em", display: "inline-block", verticalAlign: "-0.125em" }}
    >
      {typeof path === "string" ? (
        <path d={path} />
      ) : (
        path.map((p, i) => <path key={i} d={p} />)
      )}
    </svg>
  );
}
