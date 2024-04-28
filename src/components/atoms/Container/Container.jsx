import clsx from "clsx";
import "./container.css";

export const Container = ({ className, children }) => (
  <div className={clsx("container", className)}>{children}</div>
);
