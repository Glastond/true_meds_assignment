import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import fetchData from "../../api/fetchData";
import withAuth from "../../components/withAuth";
import { logoutUser } from "../../store/actions";

const Home = () => {
  let initialMinute = 1,
    initialSeconds = 0;
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [items, setItems] = useState([]);
  const [fetchedItems, setFetchedItems] = useState(false);
  const token = useSelector((state) => state.token);

  // using useDispatch hook
  const dispatch = useDispatch();

  const history = useHistory();

  useEffect(() => {
    let myInterval = setInterval(() => {
      const fetchApiData = async () => {
        const res = await fetchData(token || "");
        if (res.status === 200) {
          setFetchedItems(true);
          setItems(res?.data?.result?.article);
        }
      };
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          !fetchedItems && fetchApiData();
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  const handleReset = (event) => {
    event.preventDefault();

    // Reset the timer
    setMinutes(initialMinute);
    setSeconds(initialSeconds);
    setFetchedItems(false);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    history.replace("/login");
  };

  return (
    <div className=" py-5 h-100">
      <div className="d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-lg-10 col-xl-10">
          <button
            className="btn btn-outline-primary logout-btn me-4"
            onClick={handleLogout}
          >
            Logout
          </button>
          {minutes === 0 && seconds === 0 ? (
            <button className="btn btn-primary" onClick={handleReset}>
              Reset
            </button>
          ) : (
            <h1>
              {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </h1>
          )}

          {/* Display List */}
          <div className="list-group mt-3">
            {items &&
              items.map((el, index) => {
                return (
                  <div
                    key={el + index}
                    className="list-group-item list-group-item-action"
                  >
                    <div className="w-100 justify-content-between">
                      {el.image ? <img src={el.image} alt="" /> : null}
                      <h5 className="mb-1">Name : {el.name}</h5>
                      <p className="text-muted">Auhtor : {el.author}</p>
                      <p className="text-muted">Category : {el.categoryName}</p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Home);
