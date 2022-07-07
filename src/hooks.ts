import {useState} from "react";

interface openConfirmProps {
    (message?: string): Promise<boolean>
}

interface confirmState {
    isView: boolean;
    message: string
}

let resolveCallback: (booleanArg: boolean) => void
export const UseConfirm = () => {
    const [_, setConfirm] = useState<confirmState>({
        isView: false,
        message: ''
    });

    const close = () => {
        setConfirm({isView: false, message: ''})
    }

    const setPositive = () => {
        resolveCallback(true)
        close()
    }

    const setNegative = () => {
        close()
    }

    const openConfirm: openConfirmProps = (message = 'Вы уверены?') => {
        setConfirm({isView: true, message: message})
        return new Promise(setPositive => {
            resolveCallback = setPositive;
        })
    }

    return {openConfirm, setPositive, setNegative}
}
