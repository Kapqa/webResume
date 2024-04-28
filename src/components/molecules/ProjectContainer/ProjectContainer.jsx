import "./projectContainer.css";
import { Typography } from "../../atoms/Typography";
export const ProjectContainer = ({ href, src, target = "_blank", text }) => (
  <div className="project-container">
    <a href={href} target={target}>
      <img src={src} className="project-container__image" />
      <Typography className="typography__blue" size="s" component="p">
        {text}
      </Typography>
    </a>
  </div>
);

//webResume/public/Капин%20ИВТ-31%20игра%20Жабы2/index.html
