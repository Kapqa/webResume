import { Card } from "../../atoms/Card";
import { Typography } from "../../atoms/Typography";
import { ProjectContainer } from "../../molecules/ProjectContainer";
import "./portfolio.css";

export const Portfolio = () => (
  <Card
    className="portfolio"
    label={
      <Typography size="s" className="homepage-card-title">
        Мои проекты:
      </Typography>
    }
    content={
      <div className="projects">
        <ProjectContainer
          href="../../../../public/Капин%20ИВТ-31%20игра%20Жабы2/index.html"
          src="../../../../public/images/x3D0ulp32Fc.jpg"
          text="Игра 'Жабы'"
        />
        <ProjectContainer
          href="../../../../public\Example site\index.html"
          src="../../../../public/images/GwdOJv7ikvM.jpg"
          text="Будущий проект"
        />
        <ProjectContainer
          href="../../../../public\Example site\index.html"
          src="../../../../public/images/GwdOJv7ikvM.jpg"
          text="Будущий проект"
        />
        <ProjectContainer
          href="../../../../public\Example site\index.html"
          src="../../../../public/images/GwdOJv7ikvM.jpg"
          text="Будущий проект"
        />
      </div>
    }
  />
);
