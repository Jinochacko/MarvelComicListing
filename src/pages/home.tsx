import { useEffect, useState } from "react";
import { Favourites } from "../containers/favourites/favourites";
import { Footer } from "../containers/footer/footer";
import { Header } from "../containers/header/header";
import { Main } from "../containers/main/main";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getMoviesList, limit, totalItems } from "../store/slices/moviesSlice";

export const Home = () => {
  const [showFavourites, setShowFavourites] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const totalRecords = useAppSelector(totalItems);
  const perPage = useAppSelector(limit);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getMoviesList());
    setHeaderHeight(document.getElementById("header")?.clientHeight as number);
  }, []);

  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");

  const filter = (type: string) => {
    let pageNum = page;
    if (type === "prev" && pageNum === 0) {
      return;
    }
    if (type === "next") {
      pageNum++;
    }
    if (type === "prev" && pageNum > 0) {
      pageNum--;
    }
    if (type === "search") {
      pageNum = 0;
    }
    let query = `offset=${pageNum}`;
    if (search) {
      query += `&titleStartsWith=${search}`;
    }
    dispatch(getMoviesList(query));
    setPage(pageNum);
  };

  const handleOnSearch = () => {
    if (search) {
      filter("search");
    } else {
      dispatch(getMoviesList());
    }
  };

  useEffect(() => {
    handleOnSearch();
  }, [search]);

  const hasMore = totalRecords > perPage;

  return (
    <>
      <Header
        searchVal={search}
        onSearchChange={setSearch}
        onFavClick={setShowFavourites}
      />
      <Main headerHeight={headerHeight} hasMoreRecoreds={hasMore} />
      {showFavourites && <Favourites onClose={setShowFavourites} />}
      {hasMore && <Footer loadContent={filter} />}
    </>
  );
};
