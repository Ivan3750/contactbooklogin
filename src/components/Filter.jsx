import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../redux/filterSlice";
import { selectFilter } from "../redux/selectors";

const Filter = () => {
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  return (
    <input
      value={filter}
      onChange={e => dispatch(setFilter(e.target.value))}
      placeholder="Пошук"
    />
  );
};

export default Filter;
