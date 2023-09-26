import React, { useEffect, useState } from "react"
import { PreloadedQuery, usePreloadedQuery } from "react-relay"
import { Virtuoso } from 'react-virtuoso'
import { homeRootQuery, homeRootQuery$data } from "../home-root/__generated__/homeRootQuery.graphql"
import styles from './grid.module.scss'
import { format, parseISO, addSeconds } from 'date-fns';

const preloadableRequest = require("../home-root/__generated__/homeRootQuery.graphql")

interface Props {
  preloadedQuery: PreloadedQuery<homeRootQuery>,
}

export const Grid: React.FC<Props> = ({ preloadedQuery }) => {
  // Possible values for country and city
  const countries = ['USA', 'Canada', 'Germany', 'France', 'Australia'];
  const cities = ['New York', 'Toronto', 'Berlin', 'Paris', 'Sydney'];

  // Function to generate a random item
  const getRandomItem = () => ({
    time: format(addSeconds(new Date(), Math.floor(Math.random() * 3600)), 'HH:mm:ss'),
    country: countries[Math.floor(Math.random() * countries.length)],
    city: cities[Math.floor(Math.random() * cities.length)],
  });

  // Initialize state with 25 random items
  const [data, setData] = useState(() => Array.from({ length: 25 }, () => getRandomItem()));

  useEffect(() => {
    // Setup interval to update data every second
    const intervalId = setInterval(() => {
      setData(prevData => [
        getRandomItem(),
        // Keep the previous items, excluding the last one
        ...prevData.slice(0, -1)
      ]);
    }, 1000);
    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const calculateRowClass = (index: number) => {
    return index % 2 === 0 ? styles.rowEven : styles.rowOdd;
  };


  return (
    <div className={styles.grid}>
      <div className={styles.headerRow}>
        <div className={styles.column}>Time</div>
        <div className={styles.column}>Country</div>
        <div className={styles.column}>City</div>
      </div>
      <Virtuoso
        className={styles.virtuoso}
        data={data}
        initialTopMostItemIndex={0}
        itemContent={(index: number, item) => (
          <div className={`${styles.row} ${calculateRowClass(index)}`}>
            <div className={styles.time}>{item.time}</div>
            <div className={styles.country}>{item.country}</div>
            <div className={styles.city}>{item.city}</div>
          </div>
        )}
      />
    </div>
  );
};


// export const Grid: React.FC<Props> = ({ preloadedQuery }) => {
//   const data: homeRootQuery$data = usePreloadedQuery(preloadableRequest, preloadedQuery)

//   const edges = data?.base_viewer_connection?.edges?.slice().sort((a, b) => a.node.modified_at - b.node.modified_at) || []
//   return <div className={styles.grid}>
//     <div className={styles.headerRow}>
//       <div className={styles.column}>Time</div>
//       <div className={styles.column}>Country</div>
//       <div className={styles.column}>City</div>
//     </div>
//     {
//       edges.length
//         ? <Virtuoso
//           className={styles.virtuoso}
//           initialTopMostItemIndex={{ index: 'LAST' }}
//           data={edges}
//           followOutput="smooth"
//           itemContent={(key, edge) => {
//             // Format the modified_at date string to display only time.
//             const timeString = format(parseISO(edge.node.modified_at), 'HH:mm:ss');

//             return <div className={styles.row} key={key}>
//               <div>{timeString}</div>
//               <div>{edge.node.feature.properties.address.country}</div>
//               <div>{edge.node.feature.properties.address.city}</div>
//             </div>
//           }}
//         />
//         : <div><h5>There are no active video views right now</h5></div>
//     }
//   </div>
// }