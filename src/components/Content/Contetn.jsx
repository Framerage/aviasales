import React, { useEffect, useState } from "react";
import AddTicketsBtn from "../UI/buttons/AddTicketsBtn";
import Ticket from "./Tickets/Ticket/Ticket";
import TabsParamsFilter from "./TabsParamsFilter/TabsParamsFilter";
import { useAllFilters } from "../Hooks/useFilters";
import CheckboxFilter from "./CheckboxFliter/CheckboxFilter";
import TicketsService from "../../API/TicketsService";
import Loader from "../UI/loader/Loader";
import { useFetching } from "../Hooks/useFetching";
import { getPagesArray, getPagesCount } from "../../utils/pages";

const Content = () => {
  const [tickets, setTickets] = useState([]);
  const [tabsFilter, setTabsFilter] = useState("");
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);
  const [checked5, setChecked5] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [allTickets, setAllTickets] = useState();

  const sortedTickets = useAllFilters(
    tabsFilter,
    setTabsFilter,
    tickets,
    checked1,
    checked2,
    checked3,
    checked4,
    checked5
  );

  let pagesArray = getPagesArray(totalPages);

  const [fetchTicketInfo, isTicketsLoading, ticketError] = useFetching(
    async () => {
      const responseAllLength = await TicketsService.getTickets();
      const response = await TicketsService.getTickets(limit, page);
      setAllTickets([...responseAllLength.data]);
      setTickets([...tickets, ...response.data]);
      const totalCount = responseAllLength.data.length;
      setTotalPages(getPagesCount(totalCount, limit));
    }
  );

  const addTickets = (e) => {
    e.preventDefault();
    setPage((count) => count + 1);
  };

  const getCheckedBox = (el) => {
    if (el.target.id === "1") {
      setChecked1(el.target.checked);
    }
    if (el.target.id === "2") {
      setChecked2(el.target.checked);
    }
    if (el.target.id === "3") {
      setChecked3(el.target.checked);
    }
    if (el.target.id === "4") {
      setChecked4(el.target.checked);
    }
    if (el.target.id === "5") {
      setChecked5(el.target.checked);
    }
  };
  useEffect(() => {
    fetchTicketInfo();
  }, [page]);
  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <aside>
        <CheckboxFilter onChange={getCheckedBox} />
      </aside>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <TabsParamsFilter
          value={tabsFilter}
          checkTab={(el) => setTabsFilter(el.target.value)}
          key={Date.now() + 1}
        />
        <div>
          {ticketError ? (
            <h2 style={{ textAlign: "center", fontSize: "10em" }}>
              Error with tickets
              <p style={{ textAlign: "center", fontSize: "0.5em" }}>
                {ticketError}
              </p>
            </h2>
          ) : isTicketsLoading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 50,
              }}
            >
              <Loader />
            </div>
          ) : sortedTickets.length !== 0 ? (
            sortedTickets.map((ticket, index) => (
              <Ticket key={index} props={ticket} />
            ))
          ) : (
            <h2 style={{ textAlign: "center", fontSize: "10em" }}>
              Tickets not found!
            </h2>
          )}
        </div>
        {sortedTickets.length !== 0 ? (
          allTickets.length !== sortedTickets.length ? (
            <AddTicketsBtn onClick={addTickets} key={Date.now() + 3}>
              Show other 5 tickets
            </AddTicketsBtn>
          ) : (
            <AddTicketsBtn
              style={{ display: "none" }}
              onClick={addTickets}
              key={Date.now() + 3}
            >
              Show other 5 tickets
            </AddTicketsBtn>
          )
        ) : (
          ""
        )}
      </div>
    </main>
  );
};

export default Content;
