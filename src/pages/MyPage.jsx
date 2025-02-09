import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";
import ReviewCard from "../components/ReviewCard";
import LoadingSpinner from "../style/LoadingSpinner";
import SortButton from "../style/SortButton";

const MyPage = () => {
  const navigate = useNavigate();
  const token = window.localStorage.getItem("token");

  useEffect(() => {
    if (token === null) {
      navigate("/user");
    }
  }, []);

  const pageSelector = useSelector(
    (state) => state.paginationSlice.currentPage
  );

  const currentPage = pageSelector.payload || 1;

  const [sortBy, setSortBy] = useState("MyWrite");
  const [handleSort, setHandleSort] = useState("createdAt");

  const handleSortBy = (target) => {
    if (handleSort === target) {
      return;
    }
    setHandleSort(target);
    refetch();
  };
  const queryFunc = async () => {
    if (sortBy === "MyWrite") {
      return await axios.get(
        `${process.env.REACT_APP_BASEURL}/api/myreviews?page=${
          currentPage - 1
        }&criteria=${handleSort}`,
        {
          headers: { authorization: token },
        }
      );
    } else if (sortBy === "LIKES") {
      return await axios.get(
        `${process.env.REACT_APP_BASEURL}/api/reviews/likes?page=${
          currentPage - 1
        }&criteria=${handleSort}`,
        {
          headers: { authorization: token },
        }
      );
    }
  };
  const { isLoading, isError, error, data, refetch } = useQuery(
    ["getMyReviews"],
    queryFunc
  );

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  if (isError) {
    console.log(error.response.data.error.message);
  }

  const myList = data.data.data.reviewList;

  const reSort = (criteria) => {
    if (criteria === sortBy) {
      return;
    }
    setSortBy(criteria);
    refetch();
  };

  const onLogoutHandler = () => {
    window.localStorage.removeItem("token");
    navigate("/");
  };

  const navArea = (
    <div>
      <div className="d-flex w-100 justify-content-center">
        <SortButton onClick={onLogoutHandler}>로그아웃</SortButton>
      </div>
      <div className="d-flex w-100 justify-content-center">
        <SortButton onClick={() => reSort("LIKES")}>
          내가 쓴 리뷰 조회
        </SortButton>
        <SortButton onClick={() => reSort("MyWrite")}>
          내가 좋아요한 리뷰 조회
        </SortButton>
      </div>
      <div className="d-flex w-100 justify-content-center">
        <SortButton onClick={() => handleSortBy("likeCount")}>
          Sort by Likes
        </SortButton>
        <SortButton onClick={() => handleSortBy("createdAt")}>
          Sort by Latest
        </SortButton>
      </div>
    </div>
  );

  if (sortBy === "MyWrite") {
    return (
      <div className="d-flex flex-column align-items-center">
        {navArea}
        {myList?.map((item) => (
          <ReviewCard key={item.id} review={item} />
        ))}
        <Pagination />
      </div>
    );
  } else if (sortBy === "LIKES") {
    return (
      <div className="d-flex flex-column align-items-center">
        {navArea}
        {myList?.map((item) => (
          <ReviewCard key={item.id} review={item} />
        ))}
        <Pagination />
      </div>
    );
  }
};

export default MyPage;
