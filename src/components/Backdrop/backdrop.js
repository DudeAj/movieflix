import React from 'react';
import styles from './backdrop.module.css';
import { useDispatch } from 'react-redux';
import * as action from '../../store/actions';

const Backdrop = (props) => {
    const dispatch = useDispatch();
    const backdropClicked = () => {
        dispatch(action.setBackrop(false))
    }
    return (
        <div className={styles.Backdrop} onClick={backdropClicked}>
            {props.children}
        </div>
    )
}

export default Backdrop