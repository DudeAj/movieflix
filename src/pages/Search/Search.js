import React, { useEffect, useState } from 'react';
import styles from './Search.module.css';
import { connect } from 'react-redux';
import axios from 'axios';
import { setBackrop } from '../../store/actions';
import MovieItem from '../../components/MovieItems/MovieItem/MovieItem';
import Button from '../../components/Pagination/Buttons/button';
import Loader from '../../components/UI/Loader/loader';

const Search = (props) => {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [debouncedQuery, setDebouncedQuery] = useState(props.query);

    useEffect(() => {
        const timerId = setTimeout(()=>{
            setDebouncedQuery(props.query);
        },1000);

        return () => {
            clearInterval(timerId);
        }
        
    }, [props.query]);

    useEffect(() => {
        
        if (debouncedQuery.length > 2) {
            
                loadData(debouncedQuery, page)
        }
        else {
            setItems([])
        }
        props.onDisableBackdrop(false)

    }, [debouncedQuery, page, props]);

    const LoadMore = () => {
        setPage(prevPage => prevPage + 1);
    }
    
    const loadData = async (searchRequest, pageNumber) => {
        setLoading(true)
        const searchUrl = `/3/search/multi?query=${searchRequest}&page=${pageNumber}&include_adult=false&region=IN`

        axios.get(searchUrl).then(res => {
            setItems(res.data.results);
            setPage(res.data.page)
            setTotalPage(res.data.total_pages);
            setTimeout(()=> {
                setLoading(false)
            },1000)
            
        })
            .catch(err => {
                console.log(err);
                setLoading(false)
            })
    }

    console.log(items)


    const details = (
        <div className={styles.PageContainer}>
            <h3 className={styles.Heading}>{props.query && `Search : ?${props.query}`}</h3>
            <div className={styles.DataContainer}>
                {items.map(item => {
                    return <MovieItem key={item.id} data={item} />
                })}
            </div>
            <div className={styles.btnHolder}>
                
                {/* <Pagination /> */}

            </div>
        </div>
    );
    return loading ? <Loader /> : details;
}

const mapStateToProps = state => {
    return {
        query: state.user.query
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onDisableBackdrop: (value) => dispatch(setBackrop(value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
;