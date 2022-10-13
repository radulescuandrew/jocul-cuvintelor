import i18n from "../configs/i18n";
import { IMenuURL } from "../interfaces/Menu.interface";

export const MENU_ROUTES: IMenuURL[] = [
  { id: 0, name: i18n.t('menu:home'), href: '' },
  { id: 1, name: i18n.t('menu:about'), href: 'about' },
  { id: 3, name: i18n.t('menu:practice-programs'), href: 'practice-programs' },
  { id: 4, name: i18n.t('menu:ongs'), href: 'ongs' },
  { id: 5, name: i18n.t('menu:contact'), href: 'contact' },
];