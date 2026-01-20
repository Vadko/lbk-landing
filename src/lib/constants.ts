export const STATUS_LABELS: Record<
  string,
  { label: string; className: string }
> = {
  completed: { label: "Готово", className: "game-status-badge completed" },
  "in-progress": {
    label: "У розробці",
    className: "game-status-badge in-progress",
  },
  planned: { label: "Заплановано", className: "game-status-badge planned" },
};
