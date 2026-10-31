type ILang = 'ru-RU' | 'en-US';
type ITarget = 'digits' | 'letters'

export type IState = {
    lang: ILang;
    settingsOpen: boolean;
    isViewConfirm: boolean;
    target: ITarget
}
