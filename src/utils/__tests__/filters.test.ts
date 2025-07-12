import { advocateFilter } from '../filters';
import { Advocate } from '../../app/apiTypes';

describe('advocateFilter', () => {
  const mockAdvocate: Advocate = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    city: 'New York',
    degree: 'Law',
    specialties: ['Criminal Defense', 'Personal Injury'],
    yearsOfExperience: 5,
    phoneNumber: 1234567890,
    createdAt: new Date(),
  };

  it('should filter by firstName (case insensitive)', () => {
    const filter = advocateFilter('john');
    expect(filter(mockAdvocate)).toBe(true);
  });

  it('should filter by lastName (case insensitive)', () => {
    const filter = advocateFilter('DOE');
    expect(filter(mockAdvocate)).toBe(true);
  });

  it('should filter by city (case insensitive)', () => {
    const filter = advocateFilter('new york');
    expect(filter(mockAdvocate)).toBe(true);
  });

  it('should filter by degree (case insensitive)', () => {
    const filter = advocateFilter('law');
    expect(filter(mockAdvocate)).toBe(true);
  });

  it('should filter by specialties (case insensitive)', () => {
    const filter = advocateFilter('criminal');
    expect(filter(mockAdvocate)).toBe(true);
  });

  it('should filter by yearsOfExperience', () => {
    const filter = advocateFilter('5');
    expect(filter(mockAdvocate)).toBe(true);
  });

  it('should return false when no match is found', () => {
    const filter = advocateFilter('xyz');
    expect(filter(mockAdvocate)).toBe(false);
  });

  it('should handle empty search term', () => {
    const filter = advocateFilter('');
    expect(filter(mockAdvocate)).toBe(true);
  });

  it('should handle partial matches', () => {
    const filter = advocateFilter('ohn');
    expect(filter(mockAdvocate)).toBe(true);
  });

  it('should handle specialty partial matches', () => {
    const filter = advocateFilter('injury');
    expect(filter(mockAdvocate)).toBe(true);
  });

  describe('filtering multiple advocates', () => {
    const mockAdvocates: Advocate[] = [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        city: 'New York',
        degree: 'Law',
        specialties: ['Criminal Defense', 'Personal Injury'],
        yearsOfExperience: 5,
        phoneNumber: 1234567890,
        createdAt: new Date(),
      },
      {
        id: 2,
        firstName: 'Jane',
        lastName: 'Smith',
        city: 'Los Angeles',
        degree: 'Business Law',
        specialties: ['Corporate Law', 'Tax Law'],
        yearsOfExperience: 10,
        phoneNumber: 9876543210,
        createdAt: new Date(),
      },
      {
        id: 3,
        firstName: 'Michael',
        lastName: 'Johnson',
        city: 'Chicago',
        degree: 'Criminal Justice',
        specialties: ['Criminal Defense', 'DUI Defense'],
        yearsOfExperience: 3,
        phoneNumber: 5555555555,
        createdAt: new Date(),
      },
      {
        id: 4,
        firstName: 'Sarah',
        lastName: 'Williams',
        city: 'Houston',
        degree: 'Family Law',
        specialties: ['Divorce', 'Child Custody'],
        yearsOfExperience: 7,
        phoneNumber: 4444444444,
        createdAt: new Date(),
      },
      {
        id: 5,
        firstName: 'Robert',
        lastName: 'Brown',
        city: 'Phoenix',
        degree: 'Environmental Law',
        specialties: ['Environmental Compliance', 'Regulatory Law'],
        yearsOfExperience: 12,
        phoneNumber: 3333333333,
        createdAt: new Date(),
      },
    ];

    it('should return 0 advocates when no match is found', () => {
      const filter = advocateFilter('xyz');
      const results = mockAdvocates.filter(filter);
      expect(results).toHaveLength(0);
    });

    it('should return 1 advocate when searching for unique name', () => {
      const filter = advocateFilter('sarah');
      const results = mockAdvocates.filter(filter);
      expect(results).toHaveLength(1);
      expect(results[0].firstName).toBe('Sarah');
    });

    it('should return 2 advocates when searching for common specialty', () => {
      const filter = advocateFilter('criminal');
      const results = mockAdvocates.filter(filter);
      expect(results).toHaveLength(2);
      expect(results.map(r => r.firstName)).toEqual(['John', 'Michael']);
    });

    it('should return 2 advocates when searching for years of experience containing "1"', () => {
      const filter = advocateFilter('1');
      const results = mockAdvocates.filter(filter);
      expect(results).toHaveLength(2);
      // Should match 10 and 12 (years of experience containing '1')
      expect(results.map(r => r.firstName)).toEqual(['Jane', 'Robert']);
    });

    it('should return 4 advocates when searching for common word in degree', () => {
      const filter = advocateFilter('law');
      const results = mockAdvocates.filter(filter);
      expect(results).toHaveLength(4);
      // Should match all except Criminal Justice
      expect(results.map(r => r.firstName)).toEqual(['John', 'Jane', 'Sarah', 'Robert']);
    });

    it('should return 5 advocates when searching with empty string', () => {
      const filter = advocateFilter('');
      const results = mockAdvocates.filter(filter);
      expect(results).toHaveLength(5);
    });

    it('should return correct advocates when searching by city', () => {
      const filter = advocateFilter('los');
      const results = mockAdvocates.filter(filter);
      expect(results).toHaveLength(1);
      expect(results[0].city).toBe('Los Angeles');
    });

    it('should return correct advocates when searching by partial string "on"', () => {
      const filter = advocateFilter('on');
      const results = mockAdvocates.filter(filter);
      expect(results).toHaveLength(4);
      expect(results.map(r => r.firstName)).toEqual(['John', 'Michael', 'Sarah', 'Robert']);
    });
  });
}); 