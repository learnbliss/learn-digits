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

const russianAlphabet = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ".split('');

const digits = [...new Array(101)].map((_, i) => i + 1);

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
                        key={item}
                        block={block}
                        setBlock={setBlock}
                        target={String(item)}
                        itemClassName={i % 2 ? styles.green : styles.red}>{item}</Item>))}
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
