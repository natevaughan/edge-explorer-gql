import React, { useEffect, useState } from "react";
import styles from '../../styles/Home.module.css'
import { gql } from '@apollo/client';
import Link from "next/link";
import apolloClient from "../../util/apolloClient";
import { useRouter } from "next/router";
import Card from "../../components/Card";

const DestinationPage = () => {

  const router = useRouter();
  const { destinationId } = router.query;

  const [destination, setDestination] = useState<any | null>(null)

  useEffect(() => {
    apolloClient.query({
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
        destinationId: destinationId,
      },
    }).then(({ data }) => {
      setDestination(data.destination)
    })
  }, [destinationId])

  if (!destination) {
    return <div className={styles.container}>loading...</div>
  }

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
          return (<Card destination={node} relativeStrength={relativeStrength} />);
        })}
      </div>
      <Link href={`/`}>
        <h3>&larr; Back to home</h3>
      </Link>
    </div>
  )
}


export default DestinationPage
