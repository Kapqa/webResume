import clsx from "clsx";
import "./logo.css";

export const Logo = ({ src, className, size = "s" }) => (
  <img
    className={clsx("logo", className)}
    alt="Logo"
    src={src}
    data-size={size}
  />
);
