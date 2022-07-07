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
}

function App() {
    const [block, setBlock] = useState(false);
    const [state, setState] = useState<IState>(localStorage[saveSettings] ? JSON.parse(localStorage[saveSettings]) : defaultState);
    useEffect(() => {
        localStorage.setItem(saveSettings, JSON.stringify(state))
    }, [state]); //eslint-disable-line
    return (
        <>
            <div className={styles.container}>
                {[...new Array(101)].map((_, i) =>
                    (<Item
                        state={state}
                        key={i}
                        block={block}
                        setBlock={setBlock}
                        digit={String(i)}
                        itemClassName={i % 2 ? styles.green : styles.red}>{i}</Item>))}
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
