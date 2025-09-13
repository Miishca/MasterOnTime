import React, { useState } from 'react';
import styles from './SearchBar.module.scss';
// import {
//   FiSearch,
//   FiMapPin,
//   FiBriefcase,
//   FiStar,
//   FiUser,
// } from 'react-icons/fi';
import type { SearchBarProps, SearchFilters } from '../../../types';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [serviceType, setServiceType] = useState('');
  const [location, setLocation] = useState('');
  // const [category, setCategory] = useState('');
  // const [firstName, setName] = useState('');
  // const [experience, setExperience] = useState('');
  // const [rating, setRating] = useState('');

 const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedServiceType = serviceType.trim();
    const trimmedLocation = location.trim();

    const filters: SearchFilters = {
      serviceType: trimmedServiceType,
      location: trimmedLocation,
    };
    /*
    const trimmedCategory = category.trim();
    const trimmedName = firstName.trim();
    const trimmedExperience = experience.trim();
    const trimmedRating = rating.trim();

    const parsedRating = trimmedRating ? parseFloat(trimmedRating) : undefined;
    if (trimmedRating && (isNaN(parsedRating!) || parsedRating! < 1 || parsedRating! > 5)) {
      alert('Rating must be a number between 1 and 5');
      return;
    }

    if (pageType === 'services') {
      filters.category = trimmedCategory;
    } else if (pageType === 'people') {
      filters.name = trimmedName;
    }

    filters.experience = trimmedExperience;
    filters.rating = trimmedRating;
    */

    onSearch(filters);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.searchBar}>
        <div className={styles.inputGroup}>
          <Input
            placeholder="Service type (e.g. Plumbing)"
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            // icon={<FiBriefcase />}
          />
          <span className={styles.divider}></span>
          <Input
            placeholder="Location (e.g. Kyiv)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            // icon={<FiMapPin />}
          />
          {/* {pageType === 'services' ? (
            <Input
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              icon={<FiSearch />}
            />
          ) : (
            <Input
              placeholder="Name"
              value={firstName}
              onChange={(e) => setName(e.target.value)}
              icon={<FiUser />}
            />
          )}
          <span className={styles.divider}></span>
          <Input
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            icon={<FiMapPin />}
          />
          <span className={styles.divider}></span>
          <Input
            placeholder="Experience"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            icon={<FiBriefcase />}
          />
          <span className={styles.divider}></span>
          <Input
            placeholder="1-5 Rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            icon={<FiStar />}
          /> */}
        </div>
        <Button label="Search" variant="searchButton" />
      </form>
    </div>
  );
};

export default SearchBar;
