import {

  Briefcase,

  Calendar,

  Check,

  ChevronLeft,

  ChevronRight,

  ExternalLink,

  GraduationCap,

  Mail,

  Phone,

} from "lucide-react";

import React, { useEffect, useState } from "react";

import "./GDGRegistrationForm.css";

 

const API_URL = "https://gdg-reg.onrender.com/api/registrations";

 

const BalancedStudentDetailsPage = () => {

  const [students, setStudents] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");

  const [filteredStudent, setFilteredStudent] = useState(null);

  const [isSearchActive, setIsSearchActive] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState(null);

 

  useEffect(() => {

    const fetchStudents = async () => {

      try {

        const response = await fetch(API_URL);

        if (!response.ok) {

          throw new Error("Error fetching data");

        }

        const data = await response.json();

        setStudents(data);

        setIsLoading(false);

      } catch (error) {

        setError(error.message);

        setIsLoading(false);

      }

    };

 

    fetchStudents();

  }, []);

 

  // Handle search on button click

  const handleSearch = () => {

    const foundStudent = students.find((student) =>

      student.fullName.toLowerCase().includes(searchQuery.toLowerCase())

    );

    setFilteredStudent(foundStudent || null);

    setIsSearchActive(true);

  };

 

  // Handle Enter key press for search

  const handleKeyDown = (event) => {

    if (event.key === "Enter") {

      handleSearch();

    }

  };

 

  if (isLoading) {

    return (

      <div className="loading-spinner">

        <div className="spinner"></div>

        Loading...

      </div>

    );

  }

 

  if (error) {

    return <div className="error-message">Error: {error}</div>;

  }

 

  return (

    <div className="page-container">

      <div className="search-container">

        <input

          type="text"

          placeholder="Search by name"

          value={searchQuery}

          onChange={(e) => setSearchQuery(e.target.value)}

          onKeyDown={handleKeyDown} // Detect Enter key

          className="search-input"

        />

        <button onClick={handleSearch} className="search-button">

          Search

        </button>

      </div>

 

      {isSearchActive && (

        filteredStudent ? (

          <div className="card">

            <div className="card-content">

              <div className="header">

                <h2>{filteredStudent.fullName}</h2>

              </div>

 

              <div className="student-details">

                <div className="details-column">

                  <div className="detail-item">

                    <Briefcase className="icon" />

                    <p>

                      <span className="label">ID:</span>{" "}

                      {filteredStudent.collegeId}

                    </p>

                  </div>

                  <div className="detail-item">

                    <GraduationCap className="icon" />

                    <p>

                      <span className="label">Year:</span>{" "}

                      {filteredStudent.yearOfStudy}

                    </p>

                  </div>

                  <div className="detail-item">

                    <Calendar className="icon" />

                    <p>

                      <span className="label">Batch:</span>{" "}

                      {filteredStudent.batch}

                    </p>

                  </div>

                  <div className="detail-item">

                    <p>

                      <span className="label">Roles:</span>{" "}

                      {filteredStudent.roles}

                    </p>

                  </div>

                  <p>

                    <span className="label">Past Membership:</span>{" "}

                    {filteredStudent.pastMember || "No"}

                  </p>

                  <div className="skills-section">

                    <p className="label">Skills:</p>

                    <div className="skills-list">

                      {filteredStudent.skills.map((skill, index) => (

                        <div key={index} className="skill-item">

                          <span className="skill-name">{skill.skill}</span>

                          <span className="skill-level">{skill.level}</span>

                        </div>

                      ))}

                    </div>

                  </div>

                </div>

                <div className="details-column">

                  <div className="domains-section">

                    <p className="label">Technical Domains:</p>

                    <div className="domains-list">

                      {filteredStudent.technicalDomains.map(

                        (domain, index) => (

                          <span

                            key={index}

                            className="domain-badge technical"

                          >

                            {domain}

                          </span>

                        )

                      )}

                    </div>

                  </div>

                  {filteredStudent.nonTechnicalDomains.length > 0 && (

                    <div className="domains-section">

                      <p className="label">Non-Technical Domains:</p>

                      <div className="domains-list">

                        {filteredStudent.nonTechnicalDomains.map(

                          (domain, index) => (

                            <span

                              key={index}

                              className="domain-badge non-technical"

                            >

                              {domain}

                            </span>

                          )

                        )}

                      </div>

                    </div>

                  )}

                  {filteredStudent.portfolio && (

                    <div className="portfolio-section">

                      <p className="label">Portfolio:</p>

                      <a

                        href={filteredStudent.portfolio}

                        target="_blank"

                        rel="nofollow"

                        className="portfolio-link"

                      >

                        View <ExternalLink className="icon" />

                      </a>

                    </div>

                  )}

 

                  <div className="application-reason">

                    <p className="label">Application:</p>

                    <p className="reason-text">

                      {filteredStudent.reason.substring(0, 50)}...

                    </p>

                    <div className="tooltip">

                      {filteredStudent.reason}

                    </div>

                  </div>

                  <div className="contact-section">

                    <div className="contact-info">

                      <p>

                        <Mail className="icon" />

                        {filteredStudent.email}

                      </p>

                      <br />

                      <p>

                        <Phone className="icon" />

                        {filteredStudent.contactNumber}

                      </p>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        ) : (

          <div>No student found with that name.</div>

        )

      )}

    </div>

  );

};

 

export default BalancedStudentDetailsPage;
