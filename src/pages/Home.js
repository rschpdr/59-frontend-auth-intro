import { useState, useEffect } from "react";

import api from "../apis/api";

function Home() {
  const [userData, setUserData] = useState({ name: "", email: "", orders: [] });

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await api.get("/profile");

        console.log(response);

        setUserData({ ...response.data });
      } catch (err) {
        console.error(err.response);
      }
    }
    fetchUser();
  }, []);

  return (
    <div>
      <p>
        <strong>Nome: </strong>
        {userData.name}
      </p>
    </div>
  );
}

export default Home;
