import "./circleLink.css";
import { Logo } from "../../atoms/Logo";
import clsx from "clsx";

export const CircleLink = ({
  className,
  href,
  size,
  src,
  target = "_blank",
}) => (
  <a className={clsx("circle-link", className)} href={href} target={target}>
    <Logo size={size} src={src} />
  </a>
);
