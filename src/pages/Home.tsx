import React from "react";
import qs from "qs";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  PizzaBlock,
  Skeleton,
  Categories,
  Sort,
  Pagination,
} from "../components";

import { useAppDispatch } from "../redux/store";
import { selectFilter } from "../redux/filter/selector";
import { selectPizzaData } from "../redux/pizza/selector";
import { setCategoryId, setCurrentPage } from "../redux/filter/slice";
import { fetchPizzas } from "../redux/pizza/asyncActions";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  import("../utils/math").then((math) => {
    console.log(math.add(16, 27));
  });

  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);

  const sortType = sort.sortProperty;

  const onChangeCategory = React.useCallback((idx: number) => {
    dispatch(setCategoryId(idx));
  }, []);

  const onChangePage = (pages: number) => {
    dispatch(setCurrentPage(pages));
  };

  const getPizzas = async () => {
    const order = sortType.includes("-") ? "asc" : "desc";
    const sortBy = sortType.replace("-", "");
    const category = categoryId ? `&category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(
      fetchPizzas({
        currentPage: String(currentPage),
        order,
        sortBy,
        category,
        search,
      })
    );
  };

  // React.useEffect(() => {
  //   if (isMounted.current) {
  //     const queryString = qs.stringify({
  //       sortProperty: sort.sortProperty,
  //       categoryId,
  //       currentPage,
  //     });

  //     navigate(`/?${queryString}`);
  //   }

  //   isMounted.current = true;
  // }, [categoryId, sort.sortProperty, currentPage]);

  // React.useEffect(() => {
  //   document.title = "React Pizza";
  //   if (!window.location.search) {
  //     const params = qs.parse(
  //       window.location.search.substring(1)
  //     ) as unknown as SearchPizzaParams;

  //     const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);

  //     dispatch(
  //       setFilters({
  //         searchValue: params.search,
  //         categoryId: Number(params.category),
  //         currentPage: Number(params.currentPage),
  //         sort: sort || sortList[0],
  //       })
  //     );
  //     isSearch.current = true;
  //   }
  // }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);

  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort value={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {status === "error" ? (
          <div>
            <h2>Произошла ошибка :(</h2>
            <p>К сожалению, не удалось получить пиццы.</p>
            <p>Попробуйте позже.</p>
          </div>
        ) : status === "loading" ? (
          skeletons
        ) : (
          pizzas
        )}
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  );
};

export default Home;
