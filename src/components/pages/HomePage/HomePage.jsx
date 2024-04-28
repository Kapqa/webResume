import { TopSection } from "../../organisms/TopSection";
import { MiddleSection } from "../../organisms/MiddleSection";
//import { Typography } from "../../atoms/Typography";
import { SocialMedia } from "../../organisms/SocialMedia";
import { Contacts } from "../../organisms/Contacts";
import "./homePage.css";
import { Occupation } from "../../organisms/Occupation";
//import { Card } from "../../atoms/Card/Card";
import { Interests } from "../../organisms/Interests";
import { Portfolio } from "../../organisms/Portfolio";
import { About } from "../../organisms/About";
export const HomePage = () => (
  <>
    <TopSection className={"top-section__different-image"} />
    <MiddleSection>
      <SocialMedia />
    </MiddleSection>
    <MiddleSection>
      <Contacts />
      <Occupation />
    </MiddleSection>
    <MiddleSection>
      <Interests />
      <About />
    </MiddleSection>
    <MiddleSection>
      <Portfolio />
    </MiddleSection>
  </>
);
