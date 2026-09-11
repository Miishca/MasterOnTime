import React, { useState } from 'react';
import styles from './SearchBar.module.scss';
import {
  FiSearch,
  FiMapPin,
  FiBriefcase,
  FiStar,
  FiUser,
} from 'react-icons/fi';
import type { SearchFiltersUI, SpecialistsSearchFilters } from '../../../types';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';

type Props = {
  onSearch: (filters: SpecialistsSearchFilters) => void;
};
const SearchBar: React.FC<Props> = ({ onSearch }) => {
  const [form, setForm] = useState<SearchFiltersUI>({
    serviceName: '',
    firstName: '',
    city: '',
    categories: '',
    tags: '',
    minExperience: '',
    minRating: '',
  });

  const handleChange = (key: keyof SearchFiltersUI, value: string) =>
    setForm((s) => ({ ...s, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const filters: SpecialistsSearchFilters = {};

    if (form.serviceName?.trim()) filters.serviceName = form.serviceName.trim();
    if (form.firstName?.trim()) filters.firstName = form.firstName.trim();
    if (form.city?.trim()) filters.city = form.city.trim();

    if (form.categories?.trim()) {
      filters.categories = form.categories
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
    }

    if (form.tags?.trim()) {
      filters.tags = form.tags
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
    }

    if (form.minExperience?.trim()) {
      const n = Number(form.minExperience);
      if (!Number.isFinite(n) || n < 0) {
        alert('Min experience must be a non-negative number');
        return;
      }
      filters.minExperience = n;
    }

    if (form.minRating?.trim()) {
      const r = Number(form.minRating);
      if (!Number.isFinite(r) || r < 0 || r > 5) {
        alert('Min rating must be between 0 and 5');
        return;
      }
      filters.minRating = r;
    }

    onSearch(filters);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.searchBar}>
        <div className={styles.inputGroup}>
          <Input
            placeholder="Service"
            value={form.serviceName ?? ''}
            onChange={(e) => handleChange('serviceName', e.target.value)}
            icon={<FiBriefcase />}
          />
          <span className={styles.divider}></span>
          <Input
            placeholder="First name"
            value={form.firstName ?? ''}
            onChange={(e) => handleChange('firstName', e.target.value)}
            icon={<FiUser />}
          />
          <span className={styles.divider} />

          <Input
            placeholder="City"
            value={form.city ?? ''}
            onChange={(e) => handleChange('city', e.target.value)}
            icon={<FiMapPin />}
          />
          <span className={styles.divider} />

          <Input
            placeholder="Categories"
            value={form.categories ?? ''}
            onChange={(e) => handleChange('categories', e.target.value)}
            icon={<FiSearch />}
          />
          <span className={styles.divider} />

          <Input
            placeholder="Tags (e.g. pipes, boilers)"
            value={form.tags ?? ''}
            onChange={(e) => handleChange('tags', e.target.value)}
            icon={<FiSearch />}
          />
          <span className={styles.divider} />

          <Input
            placeholder="Experience"
            value={form.minExperience ?? ''}
            onChange={(e) => handleChange('minExperience', e.target.value)}
            icon={<FiBriefcase />}
          />
          <span className={styles.divider} />

          <Input
            placeholder="Rating"
            value={form.minRating ?? ''}
            onChange={(e) => handleChange('minRating', e.target.value)}
            icon={<FiStar />}
          />
        </div>
        <Button label="Search" variant="searchButton" />
      </form>
    </div>
  );
};

export default SearchBar;
