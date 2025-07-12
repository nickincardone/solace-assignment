"use client";

import { useEffect, useState } from "react";
import { Advocate, AdvocatesSuccessResponse, PaginationMetadata } from "./apiTypes";
import PaginationTable from "../components/PaginationTable";

const advocateFilter = (searchTerm: string) => {
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

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState<PaginationMetadata | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchAdvocates = async (page: number = 1) => {
    try {
      setError(null);

      const response = await fetch(`/api/advocates?limit=20&page=${page}`);
      const jsonResponse: AdvocatesSuccessResponse = await response.json();
      
      setAdvocates(jsonResponse.data);
      setFilteredAdvocates(jsonResponse.data);
      setPagination(jsonResponse.pagination);
      setCurrentPage(page);
    } catch (error) {
      setError("Sorry an error occurred");
      console.error("Error fetching advocates:", error);
    }
  };

  useEffect(() => {
    fetchAdvocates(currentPage);
  }, []);

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm.trim() === "") {
        setFilteredAdvocates(advocates);
      } else {
        setFilteredAdvocates(advocates.filter(advocateFilter(searchTerm)));
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, advocates]);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);
  };

  const resetSearch = () => {
    setFilteredAdvocates(advocates);
    setSearchTerm("");
  };

  const handlePageChange = (page: number) => {
    fetchAdvocates(page);
    setSearchTerm("");
  };

  const advocateColumns = [
    {
      key: 'firstName',
      header: 'First Name',
      render: (advocate: Advocate) => advocate.firstName,
    },
    {
      key: 'lastName',
      header: 'Last Name',
      render: (advocate: Advocate) => advocate.lastName,
    },
    {
      key: 'city',
      header: 'City',
      render: (advocate: Advocate) => advocate.city,
    },
    {
      key: 'degree',
      header: 'Degree',
      render: (advocate: Advocate) => advocate.degree,
    },
    {
      key: 'specialties',
      header: 'Specialties',
      render: (advocate: Advocate) => (
        <div>
          {advocate.specialties.map((s, i) => (
            <div key={i}>{s}</div>
          ))}
        </div>
      ),
    },
    {
      key: 'yearsOfExperience',
      header: 'Years of Experience',
      render: (advocate: Advocate) => advocate.yearsOfExperience,
    },
    {
      key: 'phoneNumber',
      header: 'Phone Number',
      render: (advocate: Advocate) => advocate.phoneNumber,
    },
  ];

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      
      {error && (
        <div style={{ color: "red", marginBottom: "20px" }}>
          {error}
        </div>
      )}
      
      <div>
        <p>Search</p>
        <p>
          Searching for: <span>{searchTerm}</span>
        </p>
        <input 
          style={{ border: "1px solid black" }} 
          onChange={onSearchChange}
          value={searchTerm}
        />
        <button onClick={resetSearch}>Reset Search</button>
      </div>
      <br />
      <br />
      
      <PaginationTable
        data={filteredAdvocates}
        pagination={pagination}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        columns={advocateColumns}
      />
    </main>
  );
}
