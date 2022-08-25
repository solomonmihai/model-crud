import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

import EditStore from "../../stores/edit";
import EditView from "./EditView";

export default function Edit() {
  const [params] = useSearchParams();
  const id = params.get("id");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (!id) {
      setLoading(false);
      return;
    }
    axios
      .get(`http://localhost:8888/models?id=${id}`)
      .then((res) => {
        EditStore.update((s) => {
          s.model = res.data.data;
          s.id = res.data._id;
        });
        setLoading(false);
        console.log("fetching model");
      })
      .catch((err) => {
        console.log("error fetching model", err);
      });
  }, []);

  if (loading) {
    return <div className="fixed top-0 left-0 w-screen h-screen text-center">loading...</div>;
  }

  return <EditView />;
}
