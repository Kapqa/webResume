import clsx from "clsx";
import { Container } from "../../atoms/Container";
import "./middleSection.css";

export const MiddleSection = ({ className, children }) => (
  <section className={clsx("middle-section__standart", className)}>
    <Container className="middle-section__container">{children}</Container>
  </section>
);
