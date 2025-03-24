import React, { useState } from "react";

export const PersonalView = () => {
  /* debemos tener en cuenta el plan selecionado aqui */
  const [listEmployees, setListEmployees] = useState([
    { row: 1 },
  ]); /* Debe completarse con la tabla Employee del Business */
  const handleAddEmployeeRow = () => {
    setListEmployees([...listEmployees, { row: listEmployees.length }]);
  };

  return (
    <div>
      <h1>PERSONAL</h1>
      {listEmployees.map((employee, index) => (
        <div key={index}>
          {/* Imagen default  */}
          <img src="" alt="" />
          {/* Nombre */}
          <input type="text" />
          {/* Horario de trabajo (dias y horas) */}
          <input type="text" />
          {/* El servicio que va ser un dropDown */}
          <input type="text" />
          {/* Rol */}
          <input type="text" />
          <button>Editar</button> {/* Abre el viewDetail (modal) */}
          <button>Eliminar</button>
        </div>
      ))}
      <button onClick={handleAddEmployeeRow}>+</button>
    </div>
  );
};
