import { Advocate } from "../app/apiTypes";

/**
 * Creates a filter function for advocates based on search term
 * Searches across name, city, degree, specialties, and years of experience
 */
export const advocateFilter = (searchTerm: string) => {
  const lowerSearchTerm = searchTerm.toLowerCase();
  
  return (advocate: Advocate): boolean => {
    return (
      advocate.firstName.toLowerCase().includes(lowerSearchTerm) ||
      advocate.lastName.toLowerCase().includes(lowerSearchTerm) ||
      advocate.city.toLowerCase().includes(lowerSearchTerm) ||
      advocate.degree.toLowerCase().includes(lowerSearchTerm) ||
      advocate.specialties.some(specialty => specialty.toLowerCase().includes(lowerSearchTerm)) ||
      advocate.yearsOfExperience.toString().includes(lowerSearchTerm)
    );
  };
};