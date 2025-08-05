export interface ProductLinkType {
  keywordParams?: string;
  typeParams?: string;
  link: string;
  linkTitle: string;
  subTxt: string;
  mode?: 'registerPage' | 'loginPage';
}
