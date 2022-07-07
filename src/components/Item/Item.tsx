import React, {useMemo} from 'react';
import styles from './Item.module.css'

type ItemProps = {
    color: string;
    children: React.ReactNode;
    digit: string;
    block: boolean;
    setBlock: (bool: boolean) => void;
}

const Item: React.FC<ItemProps> = ({color, children, digit,block,  setBlock}) => {
    const synth = speechSynthesis;
    const voice = useMemo(
        () =>
            new SpeechSynthesisUtterance(),
        []
    )
    voice.lang = 'ru-RU'
    // voice.lang = 'en-US'

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
        <div className={styles.root} style={{color: color}}>
            <div className={styles.digit} onClick={handleVoice}>{children}</div>
        </div>
    );
};

export default Item;
