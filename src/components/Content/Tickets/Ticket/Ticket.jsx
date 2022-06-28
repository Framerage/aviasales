import React from "react";
import classes from "./ticket.module.css";
import ticketLogoS7 from "./images/logoS7.jpg";
import ticketLogoVolga from "./images/logoVolga.jpg";
import ticketLogoTurbo from "./images/logoTurbo.jpg";

const Ticket = ({ props }) => {
  function getHours(time) {
    const routeTime =
      Math.floor(time.duration / 60) + "ч " + (time.duration % 60) + "мин";
    return routeTime;
  }

  function getEditPrice(price) {
    let beforeThousand;
    price % 1000 === 0
      ? (beforeThousand = "000")
      : (beforeThousand = price % 1000);
    let afterThousand = Math.floor(price / 1000);
    let priceText = afterThousand + " " + beforeThousand;
    return priceText;
  }

  function getArrival(route) {
    let time = route.date.split(":");
    let exit = parseInt(time[0]) * 60 + parseInt(time[1]); // Время выезда в минутах
    let restOfDay = 24 * 60 - exit; // Остаток дня в минутах
    let arrival = 0;
    if (restOfDay < route.duration) {
      arrival = route.duration - restOfDay;
    } else {
      arrival = exit + route.duration;
    }
    function getTimeFromMins(mins) {
      let hours;
      if (Math.trunc(mins / 60) < 10) {
        hours = "0" + Math.trunc(mins / 60);
      } else hours = Math.trunc(mins / 60);
      let minutes;
      if (mins % 60 === 0) {
        minutes = "00";
      } else minutes = mins % 60;
      return hours + ":" + minutes;
    }
    return getTimeFromMins(arrival);
  }

  return (
    <div className={classes.ticket}>
      <div className={classes.ticket__headerInfo}>
        <span className={classes.ticket__price}>
          {getEditPrice(props.price)} Р
        </span>
        <span className={classes.ticket__logo}>
          {props.carrier === "Airsales" ? (
            <img
              src={ticketLogoS7}
              style={{ width: "40px", height: "40px", borderRadius: "20px" }}
              alt="LOGOcompany"
            />
          ) : props.carrier === "Volga" ? (
            <img
              src={ticketLogoVolga}
              style={{ width: "50px", height: "45px", borderRadius: "20px" }}
              alt="LOGOcompany"
            />
          ) : (
            <img
              src={ticketLogoTurbo}
              style={{ width: "40px", height: "40px", borderRadius: "20px" }}
              alt="LOGOcompany"
            />
          )}
          <span className={classes.ticket__company}>{props.carrier}</span>
        </span>
      </div>
      {props.segments.map((route) => (
        <div className={classes.ticket__contentInfo}>
          <div className={classes.ticket__info}>
            <div className={classes.ticket__path}>
              <span>
                <span className={classes.ticket__firstText}>
                  {route.origin} - {route.destination}
                  <br />
                </span>
                <span className={classes.ticket__secondText}>
                  {route.date} - {getArrival(route)}
                </span>
              </span>
            </div>

            <div className={classes.ticket__path_2}>
              <span>
                <span className={classes.ticket__firstText}>
                  В ПУТИ
                  <br />
                </span>
                <span className={classes.ticket__secondText}>
                  {getHours(route)}
                </span>
              </span>
            </div>
          </div>

          <div className={classes.ticket__transfer}>
            <span>
              <span className={classes.ticket__firstText}>
                {route.stops.length}
                {route.stops.length === 1
                  ? " ПЕРЕСАДКА"
                  : route.stops.length === 2 ||
                    route.stops.length === 3 ||
                    route.stops.length === 4
                  ? " ПЕРЕСАДКИ"
                  : " ПЕРЕСАДОК"}
                <br />
              </span>
                <span className={classes.ticket__secondText}>
                  {route.stops.join(",")}
                </span>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Ticket;
