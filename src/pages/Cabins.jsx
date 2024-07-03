import { useEffect, useState } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getCabins } from "../services/apiCabins";

function Cabins() {
  const [cabins, setCabins] = useState({});
  useEffect(function () {
    getCabins().then((data) => setCabins(data));
  }, []);

  return (
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <p>{JSON.stringify(cabins)}</p>
      <img
        src="https://grsippozsesugdalgnst.supabase.co/storage/v1/object/public/cabin-images/cabin_001.jpg"
        alt=""
      />
    </Row>
  );
}

export default Cabins;
