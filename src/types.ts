type ILang = 'ru-RU' | 'en-US';
export type ITarget = 'digits' |
    'russianAlphabet' |
    'syllablesWithA' |
    'syllablesWithO' |
    'syllablesWithU' |
    'syllablesWithI' |
    'syllablesWithE' |
    'syllablesWithY'

export type IState = {
    lang: ILang;
    settingsOpen: boolean;
    isViewConfirm: boolean;
    target: ITarget
}
