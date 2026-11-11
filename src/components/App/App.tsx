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

const russianAlphabet = [
    { target: "А", example: "а... Аист, Арбуз" },
    { target: "Б", example: "бэ... Барабан, Банан" },
    { target: "В", example: "вэ... Волк, Вода" },
    { target: "Г", example: "гэ... Гора, Гриб" },
    { target: "Д", example: "дэ... Дом, Дерево" },
    { target: "Е", example: "е... Енот, Ежевика" },
    { target: "Ё", example: "ё... Ёж, Ёлка" },
    { target: "Ж", example: "жэ... Жук, Жираф" },
    { target: "З", example: "зэ... Зонт, Заяц" },
    { target: "И", example: "и... Игла, Игрушка" },
    { target: "Й", example: "и краткое. Йод, Йогурт" },
    { target: "К", example: "ка... Кот, Карандаш" },
    { target: "Л", example: "эль... Лодка, Лимон" },
    { target: "М", example: "эм... Молоко, Машина" },
    { target: "Н", example: "эн... Нос, Ножницы" },
    { target: "О", example: "оо... Облако, Окно" },
    { target: "П", example: "пэ... Парус, Поезд" },
    { target: "Р", example: "эр... Рыба, Ракета" },
    { target: "С", example: "эс... Солнце, Самолет" },
    { target: "Т", example: "тэ... Тигр, Телефон" },
    { target: "У", example: "уу... Утка, Улитка" },
    { target: "Ф", example: "эф... Флаг, Фонарь" },
    { target: "Х", example: "ха... Хлеб, Хлебопечка" },
    { target: "Ц", example: "цэ... Цветок, Цапля" },
    { target: "Ч", example: "че... Чашка, Часы" },
    { target: "Ш", example: "ша... Шар, Шоколад" },
    { target: "Щ", example: "ща... Щенок, Щетка" },
    { target: "Ъ", example: "твердый знак" },
    { target: "Ы", example: "ы" },
    { target: "Ь", example: "мягкий знак" },
    { target: "Э", example: "э... Эхо, Экран" },
    { target: "Ю", example: "ю... Юбка, Юла" },
    { target: "Я", example: "я... Яблоко, Якорь" }
];

const digits = [...new Array(101)].map((_, i) => ({target: String(i + 1), example: String(i + 1)}));

function App() {
    const [block, setBlock] = useState(false);
    const [state, setState] = useState<IState>(localStorage[saveSettings] ? JSON.parse(localStorage[saveSettings]) : defaultState);
    useEffect(() => {
        localStorage.setItem(saveSettings, JSON.stringify(state))
    }, [state]); //eslint-disable-line

    const target = state.target === 'digits' ? digits : russianAlphabet
    console.log('onyx target:', target)

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
