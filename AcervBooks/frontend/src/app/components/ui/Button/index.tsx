import { ReactNode, ButtonHTMLAttributes } from "react";
import styles from './styles.module.css';

import { FaSpinner } from 'react-icons/fa';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
    children: ReactNode;
}

export function Button({ loading, children, ...rest }: ButtonProps) {
    return (
        <button
            className={styles.button}
            disabled={loading}
            {...rest}
        >
            { loading ? (
                <FaSpinner color="#FFF" size={16} className={styles["spin-animation"]}/>
            ) : (
                <a>{children}</a>
            )}

        </button>
    );
}