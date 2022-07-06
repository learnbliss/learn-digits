import React from 'react';
import styles from './Item.module.css'

type ItemProps = {
    color: string;
    children: React.ReactNode;
    digit: string;
}

const Item: React.FC<ItemProps> = ({color, children, digit}) => {
    const handleVoice = () => {
        speechSynthesis.speak(
            new SpeechSynthesisUtterance(digit)
        );
    }
    return (
        <div className={styles.root} style={{color: color}}>
            <div className={styles.digit} onClick={handleVoice}>{children}</div>
        </div>
    );
};

export default Item;
