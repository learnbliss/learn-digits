import React from 'react';
import styles from './App.module.css'
import Item from "../Item";

function App() {
    // const [, set] = useState(initial);
    return (
        <>
            <div className={styles.container}>
                {[...new Array(101)].map((_, i) => <Item digit={String(i)} color={i % 2 ? '#25A17E' : '#CB1D35'}>{i}</Item>)}
            </div>
            <div>
                <button>Settings</button>
            </div>
        </>
    );
}

export default App;
