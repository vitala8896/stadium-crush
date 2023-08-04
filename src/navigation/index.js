import { nanoid } from 'nanoid';
import { ReactComponent as Scoreboard } from '../assets/img/Icons/scoreboard.svg';
import { ReactComponent as ScoreboardWhite } from '../assets/img/Icons/scoreboardWhite.svg';
import { ReactComponent as History } from '../assets/img/Icons/history.svg';
import { ReactComponent as HistoryWhite } from '../assets/img/Icons/historyWhite.svg';
import { ReactComponent as Award } from '../assets/img/Icons/award.svg';
import { ReactComponent as AwardWhite } from '../assets/img/Icons/awardWhite.svg';


export const appNavigation = [
  {
    id: nanoid(),
    title: 'Current Matches',
    slug: 'matches',
    icon: <Scoreboard />,
    iconActive: <ScoreboardWhite />,
    path: '/',
    selected: false
  },
  {
    id: nanoid(),
    title: 'Archived Matches',
    slug: 'archived',
    icon: <History />,
    iconActive: <HistoryWhite />,
    path: 'arhiv',
    selected: false
  },
  {
    id: nanoid(),
    title: 'Sponsor’s Awards',
    slug: 'awards',
    icon: <Award/>,
    iconActive: <AwardWhite/>,
    path: 'sponsor',
    selected: false
  },
];

export const slugs = [
  'matches',
  'archived',
  'awards',
];
