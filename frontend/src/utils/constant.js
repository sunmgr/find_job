
export const USER_API_END_POINT = import.meta.env.MODE === "development" ? "http://localhost:8000/api/v1/user" : "/api/v1/user"
export const JOB_API_END_POINT = import.meta.env.MODE === "development" ? "http://localhost:8000/api/v1/job" : "/api/v1/job"
export const APPLICATION_API_END_POINT = import.meta.env.MODE === "development" ? "http://localhost:8000/api/v1/application" : "/api/v1/application"
export const COMPANY_API_END_POINT = import.meta.env.MODE === "development" ? "http://localhost:8000/api/v1/company" : "/api/v1/company"

