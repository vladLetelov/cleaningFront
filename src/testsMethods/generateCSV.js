export const generateCSV = (formData) => {
    const csvContent = `data:text/csv;charset=utf-8,${encodeURIComponent(
      `ООО "Белоснежка" Химчистка \n
    Имя- ${formData.firstName}, Фамилия - ${formData.lastName}, Отчество - ${formData.middleName}, Телефон - ${formData.phone}, Услуга - ${formData.service}\n
    Наши контакты \n
    Телефон: +7 999 888 77 66 \n
    Почта: him@spb.ru \n
    Адрес: г. Москва, ул. Тверская, д. 22, оф. 3`
    )}`;
  
    const link = document.createElement("a");
    link.setAttribute("href", csvContent);
    link.setAttribute("download", "application.csv");
    link.click();
  };
  