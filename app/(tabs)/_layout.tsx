import React, { useEffect } from "react";
import { homeHoldingApi } from "@api";

export default function TabLayout() {
  useEffect(() => {
    fetchData().then((r) => console.log(r));
  }, []);

  const fetchData = async () => {
    const { data } = await homeHoldingApi.getSearchFnoInstruments();
    // setHoldingList(data);
    // setLoading(false);
  };

  return null;
}
