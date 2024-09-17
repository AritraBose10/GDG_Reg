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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCount, setSelectedCount] = useState(0);
  const [selectedCandidates, setSelectedCandidates] = useState([]);

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
        const savedSelection =
          JSON.parse(localStorage.getItem("selectedCandidates")) || [];
        setSelectedCandidates(savedSelection);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handlePrevious = () => {
    setIsLoading(true);
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : students.length - 1
    );
    setTimeout(() => setIsLoading(false), 500);
  };

  const handleNext = () => {
    setIsLoading(true);
    setCurrentIndex((prevIndex) =>
      prevIndex < students.length - 1 ? prevIndex + 1 : 0
    );
    setTimeout(() => setIsLoading(false), 500);
  };
  const handleClearLocalStorage = () => {
    localStorage.clear();
    alert("Local storage has been cleared.");
  };

  const handleSelect = () => {
    if (students.length > 0) {
      const selectedStudent = {
        name: students[currentIndex].fullName,
        email: students[currentIndex].email,
      };

      // Retrieve existing data from localStorage or initialize as empty array
      const existingData =
        JSON.parse(localStorage.getItem("selectedCandidates")) || [];

      // Check if the student is already selected
      const index = existingData.findIndex(
        (student) => student.email === selectedStudent.email
      );

      if (index === -1) {
        // Add new selection
        existingData.push(selectedStudent);
        localStorage.setItem(
          "selectedCandidates",
          JSON.stringify(existingData)
        );
        setSelectedCount(existingData.length);
        setSelectedCandidates(existingData); // Update state

        alert(`Selected student: ${selectedStudent.name}`);
      } else {
        alert("This candidate is already selected.");
      }
    }
  };
  const handleDownload = () => {
    const data = JSON.parse(localStorage.getItem("selectedCandidates")) || [];

    const csvRows = [
      ["Name", "Email"], // Header row
      ...data.map((student) => [student.name, student.email]),
    ];

    const csvContent = csvRows.map((e) => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "selected_candidates.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Export selected student details to Excel

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

  if (students.length === 0) {
    return <div>No students available.</div>;
  }

  const currentStudent = students[currentIndex];

  return (
    <div className="page-container">
      <button onClick={handleDownload} className="download-button">
        Download CSV
      </button>
      <button onClick={handleClearLocalStorage} className="reset-button">
        Reset Local Storage
      </button>
      <div className="application-info">
        Application Number: {currentIndex + 1}
      </div>
      <div className="select-info">Selected Candidates: {selectedCount}</div>

      <div className="card">
        <div className="card-content">
          <div className="header">
            <h2>{currentStudent.fullName}</h2>
            <div className="navigation-buttons">
              <button onClick={handlePrevious} className="nav-button">
                <ChevronLeft />
              </button>
              <button onClick={handleNext} className="nav-button">
                <ChevronRight />
              </button>
            </div>
          </div>

          <div className="student-details">
            <div className="details-column">
              <div className="detail-item">
                <Briefcase className="icon" />
                <p>
                  <span className="label">ID:</span> {currentStudent.collegeId}
                </p>
              </div>
              <div className="detail-item">
                <GraduationCap className="icon" />
                <p>
                  <span className="label">Year:</span>{" "}
                  {currentStudent.yearOfStudy}
                </p>
              </div>
              <div className="detail-item">
                <Calendar className="icon" />
                <p>
                  <span className="label">Batch:</span> {currentStudent.batch}
                </p>
              </div>
              <div className="detail-item">
                <p>
                  <span className="label">Roles:</span> {currentStudent.roles}
                </p>
              </div>
              <div className="skills-section">
                <p className="label">Skills:</p>
                <div className="skills-list">
                  {currentStudent.skills.map((skill, index) => (
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
                  {currentStudent.technicalDomains.map((domain, index) => (
                    <span key={index} className="domain-badge technical">
                      {domain}
                    </span>
                  ))}
                </div>
              </div>
              {currentStudent.nonTechnicalDomains.length > 0 && (
                <div className="domains-section">
                  <p className="label">Non-Technical Domains:</p>
                  <div className="domains-list">
                    {currentStudent.nonTechnicalDomains.map((domain, index) => (
                      <span key={index} className="domain-badge non-technical">
                        {domain}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <div className="portfolio-section">
                <p className="label">Portfolio:</p>
                <a
                  href={currentStudent.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="portfolio-link"
                >
                  View <ExternalLink className="icon" />
                </a>
              </div>
              <div className="application-reason">
                <p className="label">Application:</p>
                <p className="reason-text">
                  {currentStudent.reason.substring(0, 50)}...
                </p>
                <div className="tooltip">{currentStudent.reason}</div>
              </div>
              <div className="contact-section">
                <div className="contact-info">
                  <p>
                    <Mail className="icon" />
                    {currentStudent.email}
                  </p>
                  <br />
                  <p>
                    <Phone className="icon" />
                    {currentStudent.contactNumber}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="select-button-container">
            <button
              onClick={handleSelect}
              className={`select-button ${
                selectedCandidates.some(
                  (candidate) => candidate.email === currentStudent.email
                )
                  ? "selected"
                  : ""
              }`}
            >
              <Check />{" "}
              {selectedCandidates.some(
                (candidate) => candidate.email === currentStudent.email
              )
                ? "Selected"
                : "Select Candidate"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalancedStudentDetailsPage;
