import dynamic from 'next/dynamic';

const Footer = dynamic(() => import('./layout/Footer'));
const Header = dynamic(() => import('./layout/Header'));
const Menu = dynamic(() => import('./layout/Menu'));
const Loader = dynamic(() => import('./layout/Loader'));
const PopUpWrapper = dynamic(() => import('./layout/PopUpWrapper'));
const SmoothScroll = dynamic(() => import('./layout/SmoothScroll'));
const ScrollTrigger = dynamic(() => import('./layout/ScrollTrigger'));
const ErrorPage = dynamic(() => import('./layout/ErrorPage'));
const LangPicker = dynamic(() => import('./layout/LangPicker'));

const HomeHero = dynamic(() => import('./Home/Hero'));
const HomeWork = dynamic(() => import('./Home/Work'));

const WorkHero = dynamic(() => import('./Work/Hero'));
const Overview = dynamic(() => import('./Work/Overview'));

const WorkHeroDetail = dynamic(() => import('./Work/Detail/WorkHeroDetail'));
const Explanation = dynamic(() => import('./Work/Detail/Explanation'));
const Relationed = dynamic(() => import('./Work/Detail/Relationed'));

const AboutHero = dynamic(() => import('./About/Hero'));
const Intro = dynamic(() => import('./About/Intro'));
const CV = dynamic(() => import('./About/Cv'));

const ContactHero = dynamic(() => import('./Contact/Hero'));

const OverviewGrid = dynamic(() => import('./Archive/OverviewGrid'));

const Button = dynamic(() => import('./common/Button'));
const LoaderBtn = dynamic(() => import('./common/Button/Loader'));
const Text = dynamic(() => import('./common/Button/Text'));
const MenuBtn = dynamic(() => import('./common/Button/Menu'));
const ScrollDown = dynamic(() => import('./common/Button/ScrollDown'));
const Tag = dynamic(() => import('./common/Tag'));

export const LayoutComponents = {
  Header,
  Footer,
  Menu,
  Loader,
  // DebugGrid,
  SmoothScroll,
  ScrollTrigger,
  ErrorPage,
  LangPicker,
  PopUpWrapper
};

export const HomeComponents = {
  HomeHero,
  HomeWork
};

export const WorkComponents = {
  WorkHero,
  Overview
};

export const WorkDetailComponents = {
  WorkHeroDetail,
  Explanation,
  Relationed
};

export const ArchiveComponents = {
  OverviewGrid
};

export const AboutComponents = {
  AboutHero,
  Intro,
  CV
};

export const ContactComponents = {
  ContactHero
};

export const ButtonComponents = {
  LoaderBtn,
  Text,
  MenuBtn,
  ScrollDown
};

export { Button, Tag };
