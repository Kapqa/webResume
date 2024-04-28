import { Card } from "../../atoms/Card";
import { CircleLink } from "../../molecules/CircleLink";
import { Typography } from "../../atoms/Typography";
import "./socialMedia.css";

export const SocialMedia = () => (
  <Card
    label={
      <Typography size="s" className="homepage-card-title">
        Мои официальные аккаунты
      </Typography>
    }
    description={
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <CircleLink
          className="bg-vk"
          href="https://vk.com/skapin"
          src="https://поверка-68.рф/assets/templates/green/images/vk.png"
          size="m"
        />
        <CircleLink
          className="bg-steam"
          href="https://steamcommunity.com/id/Revenge250/"
          src="https://pngshare.com/wp-content/uploads/2021/06/Discord-Logo-Black-Background-7.png"
          size="m"
        />
        <CircleLink
          className="bg-facebook"
          href="https://www.facebook.com/profile.php?id=100078907191539"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cd/Facebook_logo_%28square%29.png"
          size="m"
        />
        <CircleLink
          className="bg-github"
          href="https://github.com/Kapqa"
          src="https://icon-library.com/images/github-icon-svg/github-icon-svg-0.jpg"
          size="m"
        />
      </div>
    }
  />
);
