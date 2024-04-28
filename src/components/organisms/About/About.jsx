import { Card } from "../../atoms/Card";
import { Typography } from "../../atoms/Typography";
import "./about.css";

export const About = () => (
  <Card
    className="about"
    label={
      <Typography size="s" className="homepage-card-title">
        Обо мне:
      </Typography>
    }
    description={
      <div>
        <Typography size="s" className="typography__white" component="p">
          Я начинающий фронтенд разработчик, если вы заинтересованы в
          сотрудничестве, пишите мне в телеграм или вконтакте.
        </Typography>
      </div>
    }
  />
);
