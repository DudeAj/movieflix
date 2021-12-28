import React, {useState} from 'react';
import searchStyle from './search.module.css';

const Search = () => {
    const [show, setShow] = useState(false);
    const changeHandler = (e) => {
        if(e.target.value.length > 2) {
            console.log(e.target.value);
        }
        
    }

    return (
        <div className={searchStyle.inputHolder}>
            <input type="text" placeholder="Search..." onChange={changeHandler} onClick={()=> setShow(true)}/>
            {show && <div><div className={searchStyle.seachHolder}></div></div>}
        </div>
    )
}

export default Search
