import React from "react";
import FilterBtn from "../../UI/buttons/FilterBtn";

const TopFilter = ({ checkTab, value }) => {
  return (
    <div style={{ display: "flex", marginLeft: "20px" }} value={value}>
      <FilterBtn
        onClick={checkTab}
        value="cheapest"
        style={{ borderRadius: "5px 0 0 5px" }}
      >
        САМЫЙ ДЕШЕВЫЙ
      </FilterBtn>
      <FilterBtn onClick={checkTab} value="fastest">
        САМЫЙ БЫСТРЫЙ
      </FilterBtn>
      <FilterBtn
        onClick={checkTab}
        value="normal"
        style={{ borderRadius: "0 5px 5px 0" }}
      >
        ОПТИМАЛЬНЫЙ
      </FilterBtn>
    </div>
  );
};
export default TopFilter;
