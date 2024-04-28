import { Card } from "../../atoms/Card";
import { Typography } from "../../atoms/Typography";
import "./contacts.css";

export const Contacts = () => (
  <Card
    className="contacts"
    label={
      <Typography size="s" className="homepage-card-title">
        Мои контакты:
      </Typography>
    }
    description={
      <div>
        <Typography
          size="s"
          className="typography__glow"
          component="p"
          weight="bold"
        >
          Telegram: https://t.me/Kapqva
        </Typography>
        <Typography
          size="s"
          className="typography__glow"
          component="p"
          weight="bold"
        >
          Mail: krhtm@mail.ru
        </Typography>
        <Typography
          size="s"
          className="typography__glow"
          component="p"
          weight="bold"
        >
          Discord: @kapqa_133
        </Typography>
      </div>
    }
  />
);
