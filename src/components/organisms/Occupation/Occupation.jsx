import { Card } from "../../atoms/Card";
import { Typography } from "../../atoms/Typography";
import "./occupation.css";

export const Occupation = () => (
  <Card
    className="occupation"
    label={
      <Typography size="s" className="homepage-card-title">
        Моя занятость:
      </Typography>
    }
    description={
      <div>
        <Typography size="s" component="p" className="typography__white">
          Учусь в УДГУ, 3 курс бакалавриата на специальности ИВТ - Информатика и
          Вычислительная Техника.
        </Typography>
      </div>
    }
  />
);
