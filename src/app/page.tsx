"use client";

import { useEffect, useState } from "react";
import { Advocate, AdvocatesSuccessResponse, PaginationMetadata } from "./apiTypes";
import PaginationTable from "../components/PaginationTable";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState<PaginationMetadata | null>(null);

  const fetchAdvocates = async (page: number = 1) => {
    try {
      const response = await fetch(`/api/advocates?limit=5&page=${page}`);
      const jsonResponse: AdvocatesSuccessResponse = await response.json();
      setAdvocates(jsonResponse.data);
      setFilteredAdvocates(jsonResponse.data);
      setPagination(jsonResponse.pagination);
      setCurrentPage(page);
    } catch (error) {
    }
  };

  useEffect(() => {
    fetchAdvocates(currentPage);
  }, []);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);

    const filteredAdvocates = advocates.filter((advocate) => {
      return (
        advocate.firstName.includes(searchValue) ||
        advocate.lastName.includes(searchValue) ||
        advocate.city.includes(searchValue) ||
        advocate.degree.includes(searchValue) ||
        advocate.specialties.some(specialty => specialty.includes(searchValue)) ||
        advocate.yearsOfExperience.toString().includes(searchValue)
      );
    });

    setFilteredAdvocates(filteredAdvocates);
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
