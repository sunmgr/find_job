

export const USER_API_END_POINT = import.meta.env.MODE === "development" ? "http://localhost:8000/api/v1/user" : "/api/v1/user"
export const ASSIGNMENT_API_END_POINT = import.meta.env.MODE === "development" ? "http://localhost:8000/api/v1/assignment" : "/api/v1/assignment"
export const APPLICATION_API_END_POINT = import.meta.env.MODE === "development" ? "http://localhost:8000/api/v1/application" : "/api/v1/application"
export const SUBJECT_API_END_POINT = import.meta.env.MODE === "development" ? "http://localhost:8000/api/v1/subject" : "/api/v1/subject"
