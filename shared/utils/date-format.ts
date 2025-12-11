export const dateFormat=(date:Date)=>{

      return  date.toLocaleDateString('es-CL', {
        day: '2-digit',
        month: 'short',
        year:'numeric'
      });

}

export const longDateTimeFormat=(value:string | Date)=>{
  const dateInstance = value instanceof Date ? value: new Date(value);

  return new Intl.DateTimeFormat('es-CL', {
        dateStyle: 'long',
        timeStyle: 'short',
        hour12:true
      }).format(dateInstance);
}