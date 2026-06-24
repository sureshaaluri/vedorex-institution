"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./Contactform.module.css";
import { STRAPI_URL } from "@/lib/constants";

interface Course {
  id: number;
  title: string;
}

interface FormData {
  id: number;
  tag_label: string;
  heading: string;
  Firstname_placeholder: string;
  lastname_placeholder: string;
  emailaddress_placeholder: string;
  PhoneNumber_placeholder: string;
  course_placeholder: string;
  button_text: string;
  image?: {
    url: string;        // ← Strapi v5
    alternativeText?: string;
  };
}

export default function ContactForm({ data }: { data: FormData }) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    courses: [] as number[],
  });

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  // Fetch courses — flatten Strapi v4 shape { id, attributes: { title } } → { id, title }
  useEffect(() => {

    const url = `${STRAPI_URL}/api/coursespages?fields[0]=title`;
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        const flattened: Course[] = (json.data ?? []).map(
          (c: { id: number, title: string }) => ({
            id: c.id,
            title: c.title,
          }),
        );
        setCourses(flattened);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const toggleCourse = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setFormValues((prev) => ({
      ...prev,
      courses: prev.courses.includes(id)
        ? prev.courses.filter((c) => c !== id)
        : [...prev.courses, id],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {

      const res = await fetch(`${STRAPI_URL}/api/enrollments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: {
            first_name: formValues.firstName,
            last_name: formValues.lastName,
            email: formValues.email,
            phone: formValues.phone,
            courses: formValues.courses,
          },
        }),
      });

      if (res.ok) {
        setStatus("success");
        setFormValues({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          courses: [],
        });
        setDropdownOpen(false);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };


const imageUrl = data.image?.url
  ? `${STRAPI_URL}${data.image.url}`
  : "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80";  return (
    <section className="py-5" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="container">
        <div className="row align-items-stretch g-5">
          {/* ===== Left — Image ===== */}
          <div className="col-12 col-lg-5">
            <img
              src={imageUrl}
              alt="Contact"
              className={`img-fluid rounded-4 shadow ${styles.contactImage}`}
            />
          </div>

          {/* ===== Right — Form ===== */}
          <div className="col-12 col-lg-7">
            {/* Tag Label */}
            <div className="d-flex align-items-center gap-2 mb-2">
              <div
                style={{
                  width: "40px",
                  height: "2px",
                  backgroundColor: "#547cd3",
                }}
              />
              <span
                className="text-uppercase fw-semibold"
                style={{
                  color: "#547cd3",
                  fontSize: "13px",
                  letterSpacing: "2px",
                }}
              >
                {data.tag_label}
              </span>
            </div>

            {/* Heading */}
            <h2
              className="fw-bold mb-4"
              style={{ fontSize: "clamp(24px, 3vw, 36px)" }}
            >
              {data.heading.split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}
            </h2>

            {/* Success Message */}
            {status === "success" && (
              <div className="alert alert-success mb-3" role="alert">
                ✅ Enrollment request sent! We will get back to you soon.
              </div>
            )}

            {/* Error Message */}
            {status === "error" && (
              <div className="alert alert-danger mb-3" role="alert">
                ❌ Something went wrong. Please try again.
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit}>
              {/* First Name & Last Name */}
              <div className="row g-3 mb-3">
                <div className="col-12 col-sm-6">
                  <input
                    type="text"
                    name="firstName"
                    className="form-control py-2"
                    placeholder={data.Firstname_placeholder}
                    value={formValues.firstName}
                    onChange={handleChange}
                    required
                    style={{ borderRadius: "8px" }}
                  />
                </div>
                <div className="col-12 col-sm-6">
                  <input
                    type="text"
                    name="lastName"
                    className="form-control py-2"
                    placeholder={data.lastname_placeholder}
                    value={formValues.lastName}
                    onChange={handleChange}
                    required
                    style={{ borderRadius: "8px" }}
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="row g-3 mb-3">
                <div className="col-12 col-sm-6">
                  <input
                    type="email"
                    name="email"
                    className="form-control py-2"
                    placeholder={data.emailaddress_placeholder}
                    value={formValues.email}
                    onChange={handleChange}
                    required
                    style={{ borderRadius: "8px" }}
                  />
                </div>
                <div className="col-12 col-sm-6">
                  <input
                    type="tel"
                    name="phone"
                    className="form-control py-2"
                    placeholder={data.PhoneNumber_placeholder}
                    value={formValues.phone}
                    onChange={handleChange}
                    style={{ borderRadius: "8px" }}
                  />
                </div>
              </div>

              {/* Course Multi-Select Dropdown */}
              <div
                className="mb-4"
                style={{ position: "relative" }}
                ref={dropdownRef}
              >
                {/* Trigger */}
                <div
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  style={{
                    border: "1px solid #dee2e6",
                    borderRadius: dropdownOpen ? "8px 8px 0 0" : "8px",
                    padding: "10px 12px",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "#fff",
                    fontSize: "14px",
                    color: formValues.courses.length ? "#212529" : "#6c757d",
                  }}
                >
                  <span>
                    {formValues.courses.length
                      ? `${formValues.courses.length} course(s) selected`
                      : data.course_placeholder || "-- Select Courses --"}
                  </span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    style={{
                      transform: dropdownOpen
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                      transition: "transform 0.2s",
                    }}
                  >
                    <path
                      d="M2 4L6 8L10 4"
                      stroke="#6c757d"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                {/* Dropdown List */}
                {dropdownOpen && (
                  <div
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      right: 0,
                      border: "1px solid #dee2e6",
                      borderTop: "none",
                      borderRadius: "0 0 8px 8px",
                      backgroundColor: "#fff",
                      zIndex: 999,
                      maxHeight: "240px",
                      overflowY: "auto",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    }}
                  >
                    {courses.length === 0 && (
                      <div
                        style={{
                          padding: "12px 16px",
                          fontSize: "14px",
                          color: "#6c757d",
                        }}
                      >
                        No courses available.
                      </div>
                    )}
                    {courses.map((course) => {
                      const isSelected = formValues.courses.includes(course.id);
                      return (
                        <div
                          key={course.id}
                          // FIX: pass event to stopPropagation inside toggleCourse
                          onClick={(e) => toggleCourse(course.id, e)}
                          style={{
                            padding: "10px 16px",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            fontSize: "14px",
                            backgroundColor: isSelected ? "#f0edff" : "#fff",
                            color: isSelected ? "#5C44D8" : "#212529",
                            borderBottom: "1px solid #f1f1f1",
                          }}
                        >
                          {/* Custom Checkbox */}
                          <div
                            style={{
                              width: "16px",
                              height: "16px",
                              borderRadius: "4px",
                              border: isSelected
                                ? "2px solid #5C44D8"
                                : "2px solid #dee2e6",
                              backgroundColor: isSelected ? "#5C44D8" : "#fff",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                            }}
                          >
                            {isSelected && (
                              <svg
                                width="10"
                                height="8"
                                viewBox="0 0 10 8"
                                fill="none"
                              >
                                <path
                                  d="M1 4L3.5 6.5L9 1"
                                  stroke="white"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}
                          </div>
                          {course.title}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn w-100 py-3 text-white fw-bold"
                disabled={status === "loading"}
                style={{
                  background: "linear-gradient(135deg, #5C44D8, #547cd3)",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "14px",
                  letterSpacing: "1px",
                  opacity: status === "loading" ? 0.7 : 1,
                }}
              >
                {status === "loading" ? "Sending..." : data.button_text}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
