import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { gql } from "@apollo/client";
import Link from "next/link";
import apolloClient from "../util/apolloClient";

const Home = () => {

  const [destinations, setDestinations] = useState([])

  useEffect(() => {
    apolloClient.query({
      query: gql`
      query HomeView {
        popularDestinations {
          id
          name
          country
        }
      }
    `
    }).then(({ data }) => {
      setDestinations(data.popularDestinations)
    });
  }, [])

  return (
    <div className={styles.container}>
      <h1>Destination explorer</h1>
      <h3>Try one of these</h3>
      <div className={styles.grid}>
        {destinations.map(destination => {
          return (
            <Link key={destination.id} href={`destination/${destination.id}`} className={styles.card}>
              <h3>{ destination.name }</h3>
            </Link>
          );
        })}
      </div>
    </div>
  )
}

export default Home;
