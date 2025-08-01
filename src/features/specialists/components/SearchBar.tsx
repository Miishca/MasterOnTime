import React, { useState } from 'react';
import styles from './SearchBar.module.scss';
import Button from '../../../components/Button/Button';
import Input from '../../../components/Input/Input';

import { FiSearch, FiMapPin, FiBriefcase, FiStar } from 'react-icons/fi';

const SearchBar: React.FC<{
  onSearch: (filters: { category: string; city: string }) => void;
}> = ({ onSearch }) => {
  const [category, setCategory] = useState('');
  const [city, setCity] = useState('');
  const [experience, setExperience] = useState('');
  const [rating, setRating] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedCategory = category.trim();
    const trimmedCity = city.trim();
    if (trimmedCategory || trimmedCity) {
      onSearch({ category: trimmedCategory, city: trimmedCity });
    } else {
      onSearch({ category: '', city: '' });
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.searchBar}>
      <div className={styles.inputGroup}>
        <Input
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        icon={<FiSearch />}
        />
        <span className={styles.divider}></span>
        <Input
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        icon={<FiMapPin />}
        />
        <span className={styles.divider}></span>
        <Input
        placeholder="2+ Experience"
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
        icon={<FiBriefcase />}
        />
        <span className={styles.divider}></span>
        <Input
        placeholder="4+"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        icon={<FiStar />}
        />
      </div>
      </form>
      <Button label="Search" variant="searchButton" />
    </div>
  );
};

export default SearchBar;
