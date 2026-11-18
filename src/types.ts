type ILang = 'ru-RU' | 'en-US';
export type ITarget = 'digits' |
'russianAlphabet' |
'letterA'

export type IState = {
    lang: ILang;
    settingsOpen: boolean;
    isViewConfirm: boolean;
    target: ITarget
}
