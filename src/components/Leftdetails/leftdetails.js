import React, { useContext, useState } from "react";
import { connect } from "react-redux";
import styles from "./leftdetails.module.css";
import Moviebasic from "../movieBasic/moviebasic";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import CheckIcon from "@mui/icons-material/Check";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import placeholderImage from "../../assets/images/placeholderImage.png";
import customeReq from "../../utils/customReq";
import * as actions from "../../store/actions";
import { Navigate, useNavigate } from "react-router-dom";
import AuthContext from "../../context/auth";
import Loader from "../Loader/Loader";
import { toast } from "react-toastify";

const Leftdetails = (props) => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  // const seasonNumber = params.season ? params.season.split('-')[1] : null;
  const imgBaseURL = "https://www.themoviedb.org/t/p/w220_and_h330_face";
  const seasonNum = props.seasonNumber - 1 < 0 ? 1 : props.seasonNumber;
  //
  const poster = props.seasonNumber
    ? props.item.seasons[seasonNum - 1].poster_path
    : props.item.poster_path;
  const type = props.item.original_title ? "movie" : "tv";

  const addWatchList = async () => {
    try  {
        setLoading(true)
        const response = await customeReq.post("/watch/add-watchlist", {
          itemId: props.item.id,
          poster: poster,
          type: type,
        });
    
        props.loadWatchList(props.authToken);
    }
    catch(err) {
        toast.error("Something went wrong");

    }
    finally {
        setLoading(false);
    }

    //
  };

  const found =
    props.watchlist.find((movie) => movie.itemId === props.item.id) ||
    props.watched.find((movie) => movie.itemId === props.item.id)
      ? true
      : false;

  return (
    <div className={styles.Left}>
      {props.item.poster_path ? (
        <img src={imgBaseURL + poster} />
      ) : (
        <img src={placeholderImage} />
      )}
      <div className={styles.imgBottom}>
        

        {!found ? (
          <div
            onClick={
              authCtx.isLoggedin ? addWatchList : () => props.signinPopup(true)
            }
          >
            <BookmarkIcon className={styles.icon} />
            {loading ? <p><Loader/> </p>: <p>Add To Watchlist</p>}
          </div>
        ) : (
          <div>
            <BookmarkIcon className={styles.icon} />
            <p>Watchlist</p>
          </div>
        )}

        <div>
          <CheckIcon className={styles.icon} />
          <p>{found ? "Yet To Watch" : "Seen"}</p>
        </div>
      </div>

      {!authCtx.isLoggedin && (
        <button className={styles.btn} onClick={() => props.signinPopup(true)}>
          Sign In To sync Watchlist
        </button>
      )}
      <hr style={{ borderColor: "grey", marginTop: "10px" }} />

      <Moviebasic
        genres={props.item.genres}
        runtime={props.item.episode_run_time || props.item.runtime}
        rating={props.item.vote_average}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedin: state.auth.isLoggedin,
    authToken: state.auth.userToken,
    watchlist: state.movie.watchlist,
    watched: state.movie.watched,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadWatchList: (token) => dispatch(actions.fetchWatchList(token)),
    signinPopup: (type) => dispatch(actions.setSigninPopup(type)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Leftdetails);
