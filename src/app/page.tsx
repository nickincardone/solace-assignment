"use client";

import { useEffect, useState } from "react";
import { Advocate, AdvocatesSuccessResponse, PaginationMetadata } from "./apiTypes";
import PaginationTable from "../components/PaginationTable";
import SearchComponent from "../components/SearchComponent";
import { advocateFilter } from "../utils/filters";

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
      wrapContent: true,
      render: (advocate: Advocate) => (
        <div className="max-w-xs">
          {advocate.specialties.map((s, i) => (
            <span key={i} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-1 mb-1">
              {s}
            </span>
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
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Solace Advocates</h1>
        <p className="text-gray-600">Find and connect with healthcare advocates</p>
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {error}
        </div>
      )}
      
      <SearchComponent
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        onReset={resetSearch}
        placeholder="Search by name, city, degree, specialties, or experience..."
        label="Search Advocates"
      />
      
      <PaginationTable
        data={filteredAdvocates}
        pagination={pagination}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        columns={advocateColumns}
      />
    </div>
  );
}
