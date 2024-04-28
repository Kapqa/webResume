import clsx from "clsx";
import "./card.css";

export const Card = ({ className, label, description, content }) => (
  <div className={clsx("card", className)}>
    {!!label && <div className="card__label">{label}</div>}
    {!!description && <div className="card__description">{description}</div>}
    {!!content && <div className="card__content">{content}</div>}
  </div>
);
