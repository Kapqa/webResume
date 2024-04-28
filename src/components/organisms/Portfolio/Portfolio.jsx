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
          src="https://sun9-79.userapi.com/impg/i67dB_RSevUVy9U3codwRm70NAvUspd9IxgfGA/x3D0ulp32Fc.jpg?size=200x300&quality=96&sign=7423f252aedf6d93c886d2ec892215b5&c_uniq_tag=eSO5qqmXbn5ZZGuKsljioA_BY-V6W5xwkty73sd33fE&type=album"
          text="Игра 'Жабы'"
        />
        <ProjectContainer
          href="../../../../public\Example site\index.html"
          src="https://sun9-50.userapi.com/impf/c845017/v845017797/13fd84/GwdOJv7ikvM.jpg?size=200x300&quality=96&sign=65e713f9f13dd5d7c4e7d34f954bb51a&c_uniq_tag=BpUnZ1U4eFp9PN785f8DxnbWciX-HgeFqsweBqSYK8o&type=album"
          text="Будущий проект"
        />
        <ProjectContainer
          href="../../../../public\Example site\index.html"
          src="https://sun9-50.userapi.com/impf/c845017/v845017797/13fd84/GwdOJv7ikvM.jpg?size=200x300&quality=96&sign=65e713f9f13dd5d7c4e7d34f954bb51a&c_uniq_tag=BpUnZ1U4eFp9PN785f8DxnbWciX-HgeFqsweBqSYK8o&type=album"
          text="Будущий проект"
        />
        <ProjectContainer
          href="../../../../public\Example site\index.html"
          src="https://sun9-50.userapi.com/impf/c845017/v845017797/13fd84/GwdOJv7ikvM.jpg?size=200x300&quality=96&sign=65e713f9f13dd5d7c4e7d34f954bb51a&c_uniq_tag=BpUnZ1U4eFp9PN785f8DxnbWciX-HgeFqsweBqSYK8o&type=album"
          text="Будущий проект"
        />
      </div>
    }
  />
);
