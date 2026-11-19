import React, {useEffect, useState} from 'react';
import styles from './App.module.css'
import Item from "../Item";
import {IState} from "../../types";
import ConfirmModal from "../ConfirmModal";

const saveSettings = 'digit_setting';
const defaultState = {
    lang: 'ru-RU',
    settingsOpen: false,
    isViewConfirm: false,
    target: 'digits'
}

const digits = [...new Array(101)].map((_, i) => ({target: String(i + 1), example: String(i + 1)}));

const russianAlphabet = [
    {target: "А", example: "а... Аист, Арбуз"},
    {target: "Б", example: "бэ... Барабан, Банан"},
    {target: "В", example: "вэ... Волк, Вода"},
    {target: "Г", example: "гэ... Гора, Гриб"},
    {target: "Д", example: "дэ... Дом, Дерево"},
    {target: "Е", example: "е... Енот, Ежевика"},
    {target: "Ё", example: "ё... Ёж, Ёлка"},
    {target: "Ж", example: "жэ... Жук, Жираф"},
    {target: "З", example: "зэ... Зонт, Заяц"},
    {target: "И", example: "и... Игла, Игрушка"},
    {target: "Й", example: "и краткое. Йод, Йогурт"},
    {target: "К", example: "ка... Кот, Карандаш"},
    {target: "Л", example: "эль... Лодка, Лимон"},
    {target: "М", example: "эм... Молоко, Машина"},
    {target: "Н", example: "эн... Нос, Ножницы"},
    {target: "О", example: "оо... Облако, Окно"},
    {target: "П", example: "пэ... Парус, Поезд"},
    {target: "Р", example: "эр... Рыба, Ракета"},
    {target: "С", example: "эс... Солнце, Самолет"},
    {target: "Т", example: "тэ... Тигр, Телефон"},
    {target: "У", example: "уу... Утка, Улитка"},
    {target: "Ф", example: "эф... Флаг, Фонарь"},
    {target: "Х", example: "ха... Хлеб, Хлебопечка"},
    {target: "Ц", example: "цэ... Цветок, Цапля"},
    {target: "Ч", example: "че... Чашка, Часы"},
    {target: "Ш", example: "ша... Шар, Шоколад"},
    {target: "Щ", example: "ща... Щенок, Щетка"},
    {target: "Ъ", example: "твердый знак"},
    {target: "Ы", example: "ы"},
    {target: "Ь", example: "мягкий знак"},
    {target: "Э", example: "э... Эхо, Экран"},
    {target: "Ю", example: "ю... Юбка, Юла"},
    {target: "Я", example: "я... Яблоко, Якорь"}
];

const syllablesWithA = [
    {target: "БА", example: "ба... Барабан, Банан"},
    {target: "ВА", example: "ваа... Вагон, Ваза"},
    {target: "ГА", example: "га... Газета, Гараж"},
    {target: "ДА", example: "да... Дача, Дар"},
    {target: "ЖА", example: "жа... Жаба, Жара"},
    {target: "ЗА", example: "за... Заяц, Замок"},
    {target: "КА", example: "каа... Карандаш, Каша"},
    {target: "ЛА", example: "ла... Лампа, Лапа"},
    {target: "МА", example: "ма... Машина, Мама"},
    {target: "НА", example: "на... Насос, Наряд"},
    {target: "ПА", example: "па... Парус, Папа"},
    {target: "РА", example: "ра... Ракета, Радуга"},
    {target: "СА", example: "са... Самолет, Сапог"},
    {target: "ТА", example: "та... Тарелка, Танк"},
    {target: "ФА", example: "фа... Фара, Фабрика"},
    {target: "ХА", example: "ха... Халат, Хамелеон"},
    {target: "ЦА", example: "ца... Цапля, Царь"},
    {target: "ЧА", example: "ча... Чашка, Часы"},
    {target: "ША", example: "ша... Шар, Шапка"},
    {target: "ЩА", example: "ща... Щавель, Щадящий"}
];

const syllablesWithO = [
    {target: "БО", example: "бо... Бочка, Ботинок"},
    {target: "ВО", example: "воо... Воробей, Волк"},
    {target: "ГО", example: "гоо... Город, Голова"},
    {target: "ДО", example: "до... Дом, Дорога"},
    {target: "ЖО", example: "жо... Жокей, Жонглёр"},
    {target: "ЗО", example: "зо... Золушка, Зонт"},
    {target: "КО", example: "коо... Корова, Кошка"},
    {target: "ЛО", example: "ло... Лодка, Ложка"},
    {target: "МО", example: "мо... Море, Мост"},
    {target: "НО", example: "но... Ножницы, Нос"},
    {target: "ПО", example: "по... Помидор, Поезд"},
    {target: "РО", example: "ро... Робот, Родина"},
    {target: "СО", example: "соо... Солнце, Соус"},
    {target: "ТО", example: "то... Тормоз, Торт"},
    {target: "ФО", example: "фо... Форма, Фото, супчик Фо"},
    {target: "ХО", example: "хо... Холод, Хор"},
    {target: "ЦО", example: "цо... Цоколь, Цокот"},
    {target: "ЧО", example: "чо... Чокнутый, Чопорный"},
    {target: "ШО", example: "шо... Шок, Шов"},
    {target: "ЩО", example: "що... Щётка - пишется через букву 'ё', но читается как с буквой О"},
];

const syllablesWithU = [
    {target: "БУ", example: "бу... Булка, Бумага"},
    {target: "ВУ", example: "ву... Вулкан, Вуаль"},
    {target: "ГУ", example: "гу... Гусь, Гусеница"},
    {target: "ДУ", example: "ду... Духи, Дудник"},
    {target: "ЖУ", example: "жу... Жук, Журнал"},
    {target: "ЗУ", example: "зу... Зубы, Зубр"},
    {target: "КУ", example: "ку... Кукла, Курица"},
    {target: "ЛУ", example: "лу... Луна, Лук"},
    {target: "МУ", example: "му... Муха, Музыка"},
    {target: "НУ", example: "ну... Нуга, Нумизмат"},
    {target: "ПУ", example: "пу... Пуговица, Пух"},
    {target: "РУ", example: "ру... Ручка, Рука"},
    {target: "СУ", example: "су... Сумка, Суп"},
    {target: "ТУ", example: "ту... Туча, Туфли"},
    {target: "ФУ", example: "фу... Футболка, Футляр"},
    {target: "ХУ", example: "ху... Художник, Худой"},
    {target: "ЦУ", example: "цу... Цукаты, Цунами"},
    {target: "ЧУ", example: "чу... Чудо, Чулок"},
    {target: "ШУ", example: "шу... Шуба, Шум"},
    {target: "ЩУ", example: "щу... Щука, Щупальца"}
];

const syllablesWithI = [
    {target: "БИ", example: "би... Билет, Бинокль"},
    {target: "ВИ", example: "ви... Вилка, Виноград"},
    {target: "ГИ", example: "ги... Гитара, Гиря"},
    {target: "ДИ", example: "ди... Диван, Динозавр"},
    {target: "ЖИ", example: "жи... Жираф, Живот"},
    {target: "ЗИ", example: "зи... Зима, Зигзаг"},
    {target: "КИ", example: "кии... Кирпич, Киви"},
    {target: "ЛИ", example: "лии... Лимон, Лизать"},
    {target: "МИ", example: "ми... Мишка, Микрофон"},
    {target: "НИ", example: "нии... Нитки, Ниппель"},
    {target: "ПИ", example: "пи... Письмо, Пила"},
    {target: "РИ", example: "ри... Рисунок, Рисоварка"},
    {target: "СИ", example: "си... Сирень, Сито"},
    {target: "ТИ", example: "ти... Тигр, Тихоход"},
    {target: "ФИ", example: "фи... Филин, Фикус"},
    {target: "ХИ", example: "хи... Хижина, Хищник"},
    {target: "ЦИ", example: "ци... Циркуль, Цифра"},
    {target: "ЧИ", example: "чи... Чиполлино, Чиж"},
    {target: "ШИ", example: "ши... Шиповник, Шина"},
    {target: "ЩИ", example: "щи... Щипцы, Щит"}
];

const syllablesWithE = [
    {target: "БЭ", example: "бэ... Бэби"},
    {target: "ВЭ", example: "вэ... Вэб"},
    {target: "ГЭ", example: "гэ... Гэп"},
    {target: "ДЭ", example: "дэ... Дэбюрт"},
    {target: "ЗЭ", example: "зэ... Зэка"},
    {target: "КЭ", example: "кэ... Кэк"},
    {target: "МЭ", example: "мэ... Мэр, Мэрия"},
    {target: "НЭ", example: "нэ... Нэп"},
    {target: "ПЭ", example: "пэ... Пэн"},
    {target: "РЭ", example: "рэ... Рэкет, Рэп"},
    {target: "СЭ", example: "сэ... Сэнсэй"},
    {target: "ТЭ", example: "тэ... Тэст"},
    {target: "ФЭ", example: "фэ... Фэнтези"},
    {target: "ХЭ", example: "хэ... Хэппи"}
];

const syllablesWithY = [
    {target: "БЫ", example: "быы... Бык, Быстро"},
    {target: "ВЫ", example: "выы... Выдра, Вьюга"},
    {target: "ДЫ", example: "ды... Дым, Дыня"},
    {target: "ЗЫ", example: "зы... Зыбка"},
    {target: "КЫ", example: "кы... Кыш"},
    {target: "ЛЫ", example: "лы... Лыжи, Лысый"},
    {target: "МЫ", example: "мыы... Мыло, Мышь"},
    {target: "НЫ", example: "ны... Нырять"},
    {target: "ПЫ", example: "пы... Пылесос, Пыль"},
    {target: "РЫ", example: "ры... Рыба, Рысь"},
    {target: "СЫ", example: "сы... Сыыр, Сынок"},
    {target: "ТЫ", example: "тыы... Тыква, Тысяча"},
    {target: "ФЫ", example: "фы... Фыркать"},
    {target: "ХЫ", example: "хы... Хычин"},
    {target: "ЦЫ", example: "цы... Цыплёнок, Цыган"},
];

export const sel = {
    russianAlphabet,
    digits,
    syllablesWithA,
    syllablesWithO,
    syllablesWithU,
    syllablesWithI,
    syllablesWithE,
    syllablesWithY,
}

function App() {
    const [block, setBlock] = useState(false);
    const [state, setState] = useState<IState>(localStorage[saveSettings] ? JSON.parse(localStorage[saveSettings]) : defaultState);
    useEffect(() => {
        localStorage.setItem(saveSettings, JSON.stringify(state))
    }, [state]); //eslint-disable-line

    const target = sel[state.target] ?? digits;

    return (
        <>
            <div className={styles.container}>
                {target.map((item, i) =>
                    (<Item
                        state={state}
                        key={item.target}
                        block={block}
                        setBlock={setBlock}
                        target={item}
                        itemClassName={i % 2 ? styles.green : styles.red}>{item.target}</Item>))}
            </div>
            <div className={styles.settingWrapper}>
                <button onClick={() => setState({...state, isViewConfirm: true})}
                        className={styles.btnSettings}>Settings
                </button>
            </div>
            {block && <div className={styles.blocked}/>}
            {state.isViewConfirm && <ConfirmModal state={state} setState={setState}/>}
        </>
    );
}

export default App;
