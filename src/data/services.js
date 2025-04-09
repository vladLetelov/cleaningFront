import axios from 'axios';

export const getServicesData = async () => {
  try {
    const response = await axios.get('https://cleaningdb.onrender.com/api/services');
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
    throw error;
  }
};