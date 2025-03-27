"use client"
import Image from "next/image";


import FeedAcompanhamento from "@/components/feedAcompanhamento";
import React, { useEffect, useState } from "react";
import { useKeycloak } from "@react-keycloak/web";






export default function Home() {

  const [load, setLoading] = useState(true)

  const [personagemList, setPersonagemList] = useState(null);




  useEffect(() => {
    fetch('http://localhost:8000/api/personagens').then(response => {
      return response.json()
    }).then(data => {
      setPersonagemList(data.data)
      setLoading(false)
    }).catch(e => {

    });


  }, [])





  return (
    <>

      {load && <FeedAcompanhamento props={null} />}

      {personagemList && <FeedAcompanhamento props={personagemList} />}

    </>

  );
}
