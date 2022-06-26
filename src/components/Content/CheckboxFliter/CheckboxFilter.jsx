import React from "react";
import classes from "./checkboxFilter.module.css";
const CheckboxFilter = ({ onChange}) => {
  return (
    <div className={classes.leftFilter}>
      <span className={classes.leftFilter__head}>КОЛИЧЕСТВО ПЕРЕСАДОК</span>
      <div className={classes.leftFilter__list}>
        <li className={classes.leftFilter__item}>
          <input
            className={classes.leftFilter__check}
            type="checkbox"
            id={1}
            onChange={(el) => {
              onChange(el);
            }}
          />
          ALL
        </li>
        <li className={classes.leftFilter__item}>
          <input
            className={classes.leftFilter__check}
            type="checkbox"
            id={2}
            onChange={(el) => {
              onChange(el);
            }}
          />
          Without stops
        </li>
        <li className={classes.leftFilter__item}>
          <input
            className={classes.leftFilter__check}
            type="checkbox"
            id={3}
            onChange={(el) => {
              onChange(el);
            }}
          />
          1 stop
        </li>
        <li className={classes.leftFilter__item}>
          <input
            className={classes.leftFilter__check}
            type="checkbox"
            id={4}
            onChange={(el) => {
              onChange(el);
            }}
          />
          2 stops
        </li>
        <li className={classes.leftFilter__item}>
          <input
            className={classes.leftFilter__check}
            type="checkbox"
            id={5}
            onChange={(el) => {
              onChange(el);
            }}
          />
          3 stops
        </li>
      </div>
    </div>
  );
};
export default CheckboxFilter;
