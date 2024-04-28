import clsx from "clsx";
import "./typography.css";

// [PROPS]
// component - h1, h2, ..., h6, span, p
// size - xs, ms, s, m, l, xl
// weight - normal, bold

export const Typography = ({
  component: Component = "span",
  children,
  className,
  size = "m",
  weight = "normal",
}) => {
  const stringifiedChildren =
    typeof children === "string" ? children : children.toString();

  return (
    <Component
      className={clsx("typography", className)}
      data-size={size}
      data-weight={weight}
    >
      {stringifiedChildren}
    </Component>
  );
};
