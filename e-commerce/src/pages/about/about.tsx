import RsschoolLogo from '../../assets/img/icons/rs_school_js.svg';
import Discord from '../../assets/img/images/discord-channel.jpg';
import Trello from '../../assets/img/images/trello.jpg';
import asyncMember from './memberData';
import Avatar from './member';
import ScreenShot from './screenShot';

function About() {
  return (
    <div className="about-wrapper">
      <h2 className="about free-page">About Us</h2>

      <div className="about-wrapper__top">
        <a href="https://rs.school/">
          <img className="rss-logo" src={RsschoolLogo} alt="rsschool-logo" />
        </a>

        <div className="asinc-title">ASInc Team</div>
      </div>
      <div className="about-wrapper__middle">
        <p>
          Meet our team, an eclectic group of student developers diving into the
          world of the E-commerstools API with gusto and a good sense of humor!
        </p>

        <p>
          We live in different countries. We differ in age and gender. We have
          never met before. And yet we are here together - in one team - to make
          our dream come true, to be a proficient frontend developer.
        </p>
        <p>
          We are ASInc Team. ASInc stands for Anzhelika, Sergey and Igor
          incorporated
        </p>
        <div className="discord-channel">
          <p>
            We engaged Discord functionality and our Mentor experience to
            arrange a team channel with voice, work-status and project-info
            sub-channels. We use it regularly, if not daily.
          </p>
          <ScreenShot screen={Discord} />
        </div>
        <div className="trello">
          <ScreenShot screen={Trello} />
          <p>
            We selected Trello as a tool for distribution of sprint tasks
            between the team members and for tracking progress in task
            completion.
          </p>
        </div>
      </div>
      <div className="about-wrapper__bottom">
        {asyncMember.map((member) => (
          <Avatar key={member.id} {...member} />
        ))}
      </div>
    </div>
  );
}

export default About;
