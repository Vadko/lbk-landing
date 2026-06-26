import { StatusPage } from "@/components/StatusPage";

export default function NotFound() {
  return (
    <StatusPage
      code="404"
      title="Сторінку не знайдено"
      text="Схоже, ця сторінка не існує або була переміщена."
    />
  );
}
