import { Card } from "../../atoms/Card";
import { Typography } from "../../atoms/Typography";
import "./interests.css";

export const Interests = () => (
  <Card
    className="interests"
    label={
      <Typography size="s" className="homepage-card-title">
        Кто я:
      </Typography>
    }
    description={
      <div>
        <Typography size="ms" component="p" className="typography__white">
          Имя: Капин Сергей
        </Typography>
        <Typography size="ms" component="p" className="typography__white">
          Никнейм: Kapqa
        </Typography>
        <Typography size="ms" component="p" className="typography__white">
          Страна: Россия
        </Typography>
        <Typography size="ms" component="p" className="typography__white">
          Увлечения: Программирование || Игры || Мультсериалы
        </Typography>
        <Typography size="ms" component="p" className="typography__white">
          Навыки: Фронтенд разработка || Тестирование
        </Typography>
      </div>
    }
  />
);
