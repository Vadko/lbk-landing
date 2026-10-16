import { AnimatedMill } from "./AnimatedMill";

export function MaintenancePage() {
  return (
    <section className="maintenance-page">
      <div className="maintenance-content">
        <AnimatedMill className="maintenance-mill" />
        <h1 className="maintenance-title">Технічні роботи</h1>
        <p className="maintenance-text">
          Наразі проводяться технічні роботи. Будь ласка, поверніться пізніше.
        </p>
        <div className="maintenance-status">
          <span className="maintenance-status-dot" />
          <span>Оновлення в процесі</span>
        </div>
      </div>
    </section>
  );
}
