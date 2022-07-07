import React, {useMemo} from 'react';
import styles from './Item.module.css'
import {IState} from "../../types";

type ItemProps = {
    state: IState;
    itemClassName: string;
    children: React.ReactNode;
    digit: string;
    block: boolean;
    setBlock: (bool: boolean) => void;
}

const Item: React.FC<ItemProps> = ({state, itemClassName, children, digit, block, setBlock}) => {
    const synth = speechSynthesis;
    const voice = useMemo(
        () =>
            new SpeechSynthesisUtterance(),
        []
    )
    voice.lang = state.lang

    const handleVoice = () => {
        if (block) {
            return
        }
        voice.onstart = () => setBlock(true)
        synth.cancel();
        voice.text = digit;
        synth.speak(voice);
        voice.onend = () => setBlock(false)
    }
    return (
        <div className={`${styles.root} ${itemClassName}`}>
            <div className={styles.digit} onClick={handleVoice}>{children}</div>
        </div>
    );
};

export default Item;
