import React, { FC } from "react";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export interface CardProps {
  destination: any,
  relativeStrength?: number,
}

const Card: FC<CardProps> = ({ destination, relativeStrength }: CardProps) => {
  return (
    <Link href={`/destination/${destination.id}`} className={styles.card}>
      <h2>{ destination.name }</h2>
      <div className={styles.country}>{ destination.country }</div>
      {relativeStrength && <div style={{height: 20, width: `${relativeStrength}%`, backgroundColor: "#aabbcc"}}>{relativeStrength}%</div>}
    </Link>
  )
}

export default Card;
