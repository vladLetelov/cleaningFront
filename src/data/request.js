import axios from 'axios';

export const getRequestData = async () => {
  try {
    const response = await axios.get('https://cleaningdb.onrender.com/api/applications');
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
    throw error;
  }
};