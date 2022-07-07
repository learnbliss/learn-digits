import React, {useEffect, useMemo, useState} from 'react';
import styles from './ConfirmModal.module.css'
import {IState} from "../../types";

type ConfirmModalProps = {
    state: IState;
    setState: (state: IState) => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({state, setState}) => {
    const [value, setValue] = useState<string>();
    const one = useMemo(
        () =>
            (Math.random() * 100).toFixed(),
        []
    )
    const two = useMemo(
        () =>
            (Math.random() * 10).toFixed(),
        []
    )
    const answer = String(+one + +two);
    console.log('answer:', answer)
    console.log('value:', value)
    useEffect(() => {
        if (answer.length === value?.length) {
            answer === value ?
                setState({...state, settingsOpen: true}) :
                setState({...state, isViewConfirm: false})
        }
    }, [answer, value]); //eslint-disable-line
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(() => e.target.value)
    }
    const handleChangeLanguage = () => {
        setState({...state, lang: state.lang === 'ru-RU' ? 'en-US' : 'ru-RU'})
    }
    return (
        <div className={styles.backDrop}>
            <div className={styles.modal}>
                {state.settingsOpen ?
                    <div>
                        <h2>settings</h2>
                        <div className={styles.settings}>
                            <span>Выбор Языка произношения: </span>
                            <button onClick={handleChangeLanguage}>{state.lang === 'ru-RU'? 'Русский': 'Английский'}</button>
                        </div>
                    </div> :
                    <label>
                        <div>Сколько будет {one} + {two}?</div>
                        <input value={value} onChange={handleChange} autoFocus={true}/>
                    </label>}
            </div>
            <div onClick={() => setState({...state, isViewConfirm: false, settingsOpen: false})} className={styles.layout}/>
        </div>
    );
};

export default ConfirmModal;
