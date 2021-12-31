import React, { useState } from 'react';
import searchStyle from './search.module.css';
import { connect } from 'react-redux';
import { setBackrop } from '../../../store/actions';
import axios from 'axios';
import SearchArea from '../../SearchArea/SearchArea';
import Spinner from '../../Spinner/spinner';
import { css } from "@emotion/react";
import RingLoader from "react-spinners/RingLoader";

const Search = (props) => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState([]);

    const override = css`
        display: block;
        margin: 0 auto;
        border-color: red;
        `;

    const changeHandler = (e) => {
        e.preventDefault();

        if (e.target.value.length > 2) {
            setLoading(true);
            const query = e.target.value;
            const searchUrl = `https://api.themoviedb.org/3/search/multi?api_key=2572250a3cd36f9f144b61d06877ba1d&language=en-US&query=${query}&page=1&include_adult=false&region=IN`
            axios.get(searchUrl)
                .then((res) => {
                    //console.log(res.data)
                    setResult(res.data.results)
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err)
                    setLoading(false);
                })
        }
    }

    const onChangeBackdrop = () => {
        props.onBackdropChange(true)
    }
    return (
        <div className={searchStyle.inputHolder}>
            <input type="text" placeholder="Search..." onChange={changeHandler} onClick={onChangeBackdrop} />
            {props.show &&
                <div>
                    <div className={searchStyle.seachHolder}>
                        {loading
                            ? <div className={searchStyle.LoadingContainer}>
                                <RingLoader color='#ffffff' css={override} loading={loading} size={50} />
                            </div>
                            : <SearchArea items={result} />}
                    </div>
                </div>}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        show: state.user.backdrop
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onBackdropChange: (status) => dispatch(setBackrop(status))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
