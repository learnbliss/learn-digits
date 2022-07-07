import React, {useState} from 'react';
import styles from './App.module.css'
import Item from "../Item";

function App() {
    const [block, setBlock] = useState(false);
    return (
        <>
            <div className={styles.container}>
                {[...new Array(101)].map((_, i) => <Item key={i} block={block} setBlock={setBlock} digit={String(i)} color={i % 2 ? '#25A17E' : '#CB1D35'}>{i}</Item>)}
            </div>
            <div>
                <button>Settings</button>
            </div>
            {block && <div className={styles.blocked}/>}
        </>
    );
}

export default App;
