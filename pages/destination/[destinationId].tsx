import React from "react";
import styles from '../../styles/Home.module.css'
import { gql } from '@apollo/client';
import Link from "next/link";
import apolloClient from "../../util/apolloClient";

const ShowLinks = ({ destination }) => {
  const edges = destination.edges
    .filter(it => it.nodes !== null)
    .sort((a, b) => { return b.strength - a.strength })

  const maxStrength = edges[0].strength


  return (
    <div className={styles.container}>
      <h1>If you are going to { destination.name },</h1>
      <h3>you might also consider</h3>
      <div className={styles.grid}>
        {edges.map(d => {
          const node = d.nodes.filter(it => it.id !== destination.id)[0]
          const relativeStrength = Math.floor(d.strength * 100.0 / maxStrength)
          return (
            <Link key={node.id} href={`/destination/${node.id}`} className={styles.card}>
              <h3>{ node.name }</h3>
              <div style={{height: 20, width: `${relativeStrength}%`, backgroundColor: "#aabbcc"}}>{relativeStrength}%</div>
            </Link>
          );
        })}
      </div>
      <Link href={`/`}>
        <h3>&larr; Back to home</h3>
      </Link>
    </div>
  )
}

export default ShowLinks

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  }
}

export async function getStaticProps(context) {
  const { data } = await apolloClient.query({
    query: gql`
    query GetDestination($destinationId: ID!) {
      destination(id: $destinationId) {
        id
        name
        country
        edges {
          id
          strength
          nodes {
            id
            name
            country
          }
        }
      }
    }
  `,
    variables: {
      destinationId: context.params.destinationId,
    },
  });

  return {
    props: {
      destination: data.destination
    }
  }
}
