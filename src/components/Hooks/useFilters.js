import { useMemo } from "react";

export const useTabsFilter = (tabsFilter, setTabsFilter, tickets) => {
  const filtredFromTabsTickets = useMemo(() => {
    if (tabsFilter) {
      let min = tickets[0].price;
      let max = 0;
      let fastTime = tickets[0].segments[0].duration;
      let longTime = 0;
      if (tabsFilter === "fastest") {
        for (let j = 0; j < tickets.length; j++) {
          for (let i = 0; i < tickets[j].segments.length; i++) {
            if (tickets[j].segments[i].duration < fastTime) {
              fastTime = tickets[j].segments[i].duration;
            }
          }
        }
        return [...tickets].filter((el) => {
          for (let i = 0; i < el.segments.length; i++) {
            if (el.segments[i].duration === fastTime) {
              return el;
            }
          }
        });
      } else if (tabsFilter === "cheapest") {
        for (let i = 0; i < tickets.length; i++) {
          if (tickets[i].price < min) {
            min = tickets[i].price;
          }
        }
        return [...tickets].filter((el) => el.price === min);
      } else {
        for (let j = 0; j < tickets.length; j++) {
          if (tickets[j].price > max) {
            max = tickets[j].price;
            for (let i = 0; i < tickets[j].segments.length; i++) {
              if (tickets[j].segments[i].duration > longTime) {
                longTime = tickets[j].segments[i].duration;
              }
            }
          }
        }
        for (let i = 0; i < tickets.length; i++) {
          if (tickets[i].price < min) {
            min = tickets[i].price;
            for (let j = 0; j < tickets[i].segments.length; j++) {
              if (tickets[i].segments[j].duration < fastTime) {
                fastTime = tickets[i].segments[j].duration;
              }
            }
          }
        }
        //console.log(max);
        //console.log(min);
        return [...tickets].filter((el) => {
          for (let i = 0; i < el.segments.length; i++) {
            if (el.segments[i].stops < 2 && el.price > min && el.price < max) {
              return el;
            }
          }
        });
      }
    }
    return tickets;
  }, [tabsFilter, tickets, setTabsFilter]);
  return filtredFromTabsTickets;
};
export const useAllFilters = (
  tabsFilter,
  setTabsFilter,
  tickets,
  checked1,
  checked2,
  checked3,
  checked4,
  checked5
) => {
  const sortedByTabs = useTabsFilter(tabsFilter, setTabsFilter, tickets);
  const filteredTickets = useMemo(() => {
    if (checked4 && checked5) {
      return [...sortedByTabs].filter((el) => {
        for (let i = 0; i < el.segments.length; i++) {
          if (
            el.segments[i].stops.length > 1 &&
            el.segments[i].stops.length < 4
          ) {
            return el;
          }
        }
      });
    } else if (checked2 && checked3) {
      return [...sortedByTabs].filter((el) => {
        for (let i = 0; i < el.segments.length; i++) {
          if (el.segments[i].stops.length < 2) {
            return el;
          }
        }
      });
    } else if (checked2 && checked5) {
      return [...sortedByTabs].filter((el) => {
        for (let i = 0; i < el.segments.length; i++) {
          if (
            el.segments[i].stops.length === 0 ||
            el.segments[i].stops.length === 3
          ) {
            return el;
          }
        }
      });
    } else if (checked2 && checked3 && checked4) {
      return [...sortedByTabs].filter((el) => {
        for (let i = 0; i < el.segments.length; i++) {
          if (el.segments[i].stops.length < 3) {
            return el;
          }
        }
      });
    } else if (
      checked2 &&
      checked3 &&
      checked4 &&
      checked5
    ) {
      return [...sortedByTabs].filter((el) => {
        for (let i = 0; i < el.segments.length; i++) {
          if (
            el.segments[i].stops.length === 3 ||
            (el.segments[i].stops.length === 0 &&
              el.segments[i].stops.length === 1) ||
            el.segments[i].stops.length === 2
          ) {
            return el;
          }
        }
      });
    } else if (checked3 && checked4) {
      return [...sortedByTabs].filter((el) => {
        for (let i = 0; i < el.segments.length; i++) {
          if (
            el.segments[i].stops.length === 1 ||
            el.segments[i].stops.length === 2
          ) {
            return el;
          }
        }
      });
    } else if (checked3 && checked5) {
      return [...sortedByTabs].filter((el) => {
        for (let i = 0; i < el.segments.length; i++) {
          if (
            el.segments[i].stops.length === 1 ||
            el.segments[i].stops.length === 3
          ) {
            return el;
          }
        }
      });
    } else if (checked2 && checked4) {
      return [...sortedByTabs].filter((el) => {
        for (let i = 0; i < el.segments.length; i++) {
          if (
            (el.segments[i].stops.length > 1 &&
              el.segments[i].stops.length < 3) ||
            el.segments[i].stops.length === 0
          ) {
            return el;
          }
        }
      });
    } else if (checked2) {
      return [...sortedByTabs].filter((el) => {
        for (let i = 0; i < el.segments.length; i++) {
          if (
            el.segments[i].stops.length === 0 ||
            el.segments[i].stops === ""
          ) {
            return el;
          }
        }
      });
    } else if (checked3) {
      return [...sortedByTabs].filter((el) => {
        for (let i = 0; i < el.segments.length; i++) {
          if (el.segments[i].stops.length === 1) {
            return el;
          }
        }
      });
    } else if (checked4) {
      return [...sortedByTabs].filter((el) => {
        for (let i = 0; i < el.segments.length; i++) {
          if (el.segments[i].stops.length === 2) {
            return el;
          }
        }
      });
    } else if (checked5) {
      return [...sortedByTabs].filter((el) => {
        for (let i = 0; i < el.segments.length; i++) {
          if (el.segments[i].stops.length === 3) {
            return el;
          }
        }
      });
    }
    if (checked1) {
      setTabsFilter("");
      return [...sortedByTabs].filter((el) => el.price);
    }

    return sortedByTabs;
  }, [
    setTabsFilter,
    checked1,
    checked2,
    checked3,
    checked4,
    checked5,
    sortedByTabs,
  ]);
  return filteredTickets;
};
