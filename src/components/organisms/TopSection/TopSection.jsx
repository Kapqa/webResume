import clsx from "clsx";
import { Container } from "../../atoms/Container";
import { AvatarInfo } from "../../molecules/AvatarInfo";
import "./topSection.css";

export const TopSection = ({ className }) => (
  <section className={clsx("top-section__standart", className)}>
    <Container>
      <AvatarInfo />
    </Container>
  </section>
);
