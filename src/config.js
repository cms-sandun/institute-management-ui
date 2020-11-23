export const API_URL = process.env.REACT_APP_API_PATH;
export const API_PATH = API_URL + 'api';

export const API = {
  students: `${API_PATH}/students`,
  branches: `${API_PATH}/branches`,
  courses: `${API_PATH}/courses`
};
