import "./avatarInfo.css";
import { Logo } from "../../atoms/Logo";
import { Typography } from "../../atoms/Typography";
import clsx from "clsx";

const AVATAR_URL =
  "https://avatars.cloudflare.steamstatic.com/bdaf33ccce1d2e177c6d6718946bced02c5c3012_full.jpg";

export const AvatarInfo = ({ className }) => (
  <div className={clsx("avatar-info", className)}>
    <div className="avatar-info__avatar-container">
      <Logo src={AVATAR_URL} size="xl" />
    </div>

    <div className="avatar-info__info-container">
      <Typography component="h1" size="xl" className="avatar-info__text_green">
        Kapqa
      </Typography>

      <Typography
        component="p"
        size="s"
        className="avatar-info__text_white"
        weight="bold"
      >
        аka this website dev.
      </Typography>

      <Typography component="p" size="xs" className="avatar-info__text_white">
        Студент третьего курса, фронтенд разработчик
      </Typography>
    </div>
  </div>
);
