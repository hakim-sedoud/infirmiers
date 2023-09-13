import React, { useState } from 'react';
import data from '../public/list.json';
import styles from './index.module.css';
import { faStar as fullStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';
import { faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Head from 'next/head';

function App() {
    const [searchTerm, setSearchTerm] = useState('');

    const renderStars = (note) => {
        const totalStars = 5;
        const stars = [];
        const fullStarsCount = Math.floor(note);
        const halfStarExists = note - fullStarsCount !== 0;

        for (let i = 1; i <= totalStars; i++) {
            if (i <= fullStarsCount) {
                stars.push(
                    <FontAwesomeIcon
                        key={i}
                        icon={fullStar}
                        className={styles.starIcon}
                        color="gold"
                    />
                );
            } else if (halfStarExists && i === fullStarsCount + 1) {
                stars.push(
                    <FontAwesomeIcon
                        key={i}
                        icon={faStarHalfAlt}
                        className={styles.starIcon}
                        color="gold"
                    />
                );
            } else {
                stars.push(
                    <FontAwesomeIcon
                        key={i}
                        icon={emptyStar}
                        className={styles.starIcon}
                        color="grey"
                    />
                );
            }
        }

        return (
            <figure className={styles.starContainer}>
                <div className={styles.stars}>
                    {stars}
                </div>
                <figcaption>Note de l'infirmière: {note} sur 5</figcaption>
            </figure>
        );
    };

    return (
        <main className={styles.App}>
            <Head>
                <title>Infirmières à Tremblay-en-France - Annuaire</title>
                <meta name="description" content="Annuaire des infirmières à Tremblay-en-France. Trouvez et contactez les meilleures professionnelles de la santé." />
                <link rel="canonical" href="http://votresite.com/" />
            </Head>
            <h1 className={styles.Header}>Annuaire des Infirmières à Tremblay-en-France</h1>
            <input
                type="text"
                placeholder="Cherchez par nom..."
                aria-label="Chercher une infirmière par nom"
                onChange={(event) => {
                    setSearchTerm(event.target.value);
                }}
                className={styles.Input}
            />
            <div className={styles.DirectoryList}>
                {data
                    .filter((val) => {
                        if (searchTerm === "") {
                            return val;
                        } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                            return val;
                        }
                        return null;
                    })
                    .sort((a, b) => b.note - a.note)
                    .map((infirmiere) => (
                        <a href={`tel:${infirmiere.phone}`} key={infirmiere.name} className={`${styles.Entry} ${styles.PhoneLink}`}>
                            <h2 className={styles.Name}>{infirmiere.name}</h2>
                            <p className={styles.Phone}>Téléphone: {infirmiere.phone}</p>
                            <p className={styles.Address}>Adresse: {infirmiere.address}</p>
                            {infirmiere.note && <div className={styles.Note}>{renderStars(infirmiere.note)}</div>}
                        </a>
                    ))}
            </div>
        </main>
    );
}

export default App;
