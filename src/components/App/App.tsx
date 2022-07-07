import React, {useState} from 'react';
import styles from './App.module.css'
import Item from "../Item";
import {IState} from "../../types";
import {UseConfirm} from "../../hooks";

function App() {
    const [block, setBlock] = useState(false);
    const [state, setState] = useState<IState>({
        lang: 'ru-RU',
        settingsOpen: false,
    });
    const {openConfirm} = UseConfirm()
    const confirmOpenSettings = async () => {
        const isConfirmed = await openConfirm('Удалить пост?')
        if (isConfirmed) {
            console.log('open settings')
        }
    }
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
                <button className={styles.btnSettings}>Settings</button>
            </div>
            {block && <div className={styles.blocked}/>}
        </>
    );
}

export default App;
