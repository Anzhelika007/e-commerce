import Lika from '../../assets/img/images/Lika-photo.jpg';
import Sergey from '../../assets/img/images/sergey-photo.jpg';
import Igor from '../../assets/img/images/igor-picture.jpg';
import bikeGirl from '../../assets/img/images/asinc-biker-girl.jpg';
import Rocker from '../../assets/img/images/asinc-rocket.jpg';
import Baby from '../../assets/img/images/asinc-baby.jpg';

const asyncMember = [
  {
    id: 2,
    firstName: 'Sergey',
    avatar: Rocker,
    avatarName: Rocker,
    photo: Sergey,
    role: 'FrontEnd Developer',
    title: 'The Fixer',
    shortBio: 'https://cerbeer.github.io/rsschool-cv/',
    gitHub: 'https://github.com/cerbeer',
    country: 'Russia',
    city: '',
    teamSay:
      'Sergey is the guy you call when everything is on fire. His catchphrase? "Now we will figure out why it does not work." Sergey approaches problems like a detective, meticulously piecing together clues until the mystery is solved, or at least until the fire is out. Sergey is always in a hurry to help and will sort out any problem.',
  },
  {
    id: 1,
    firstName: 'Anzhelika',
    avatar: bikeGirl,
    avatarName: 'asinc-bikegirl-avatar',
    photo: Lika,
    role: 'FrontEnd Developer',
    title: 'The Captain',
    shortBio: 'https://anzhelika007.github.io/rsschool-cv/cv',
    gitHub: 'https://github.com/anzhelika007',
    country: 'Georgia',
    city: 'Batumi',
    teamSay:
      'Our fearless leader. Her motto? "Let us start doing it - we will figure it out there!" Angelica is the kind of person who dives headfirst into the deep end, assuming there is water below. Spoiler: there is usually not, but she always finds a way to swim. When Angelica says jump, she is already mid-air. She motivates the team to dive into projects headfirst, confident they will figure things out along the way.',
  },
  {
    id: 3,
    firstName: 'Igor',
    avatar: Baby,
    avatarName: 'asinc-baby-avatar',
    photo: Igor,
    role: 'FrontEnd Developer',
    title: 'The Scholar',
    shortBio: 'https://cheidru.github.io/rsschool-cv/',
    gitHub: 'https://github.com/cheidru',
    country: 'Russia',
    city: 'Moscow',
    teamSay:
      'Igor lives and breathes theory. If you see him, he is likely buried in documentation or clutching a reference book like it is the Holy Grail. His belief in the power of well-understood concepts and well-documented procedures is unwavering. If the team needs a theoretical solution, Igor has got it covered. Igor will understand all the subtleties and details.',
  },
];

export default asyncMember;
