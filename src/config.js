export const API_URL = process.env.REACT_APP_API_PATH;
export const API_PATH = API_URL + 'api';

export const API = {
  students: `${API_PATH}/students`,
  students_attendance: `${API_PATH}/students/attendance`,
  employees: `${API_PATH}/employees`,
  batches: `${API_PATH}/batches`,
  branches: `${API_PATH}/branches`,
  courses: `${API_PATH}/courses`,
  exams: `${API_PATH}/exams`,
  users: `${API_PATH}/users`,
  classes: `${API_PATH}/classes`,
};
