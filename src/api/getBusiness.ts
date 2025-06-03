interface IAddress {
  street: string;
  city: string;
  province?: string;
  country?: string;
}

interface Service {
  id: string;
  name: string;
  price: number;
  duration: number;
  description: string;
}
interface Employee {
  id: string;
  name: string;
  role: string;
  services: Service[];
}
interface BusinessHours {
  id: string;
  day_of_week: string;
  opening_morning_time: string;
  closing_morning_time: string;
  opening_evening_time: string | null;
  closing_evening_time: string | null;
}

export interface PropsBusiness {
  id: string;
  name: string;
  logo: string;
  address: IAddress;
  open: boolean;
  service: Service[];
  category: string;
  employees: Employee[];
  business_hours: BusinessHours[];
}
const negocios: PropsBusiness[] = [
  {
    id: "1",
    name: "Peluquería Style",
    category: "Peluquería",
    logo: "/placeholder.svg",
    open: true,
    address: {
      street: "Av. Santa Fe 1234",
      city: "Palermo",
    },
    service: [
      {
        id: "s1",
        name: "Corte",
        price: 1500,
        duration: 30,
        description: "Corte de cabello profesional",
      },
      {
        id: "s2",
        name: "Teñido",
        price: 3000,
        duration: 60,
        description: "Coloración completa",
      },
      {
        id: "s3",
        name: "Peinado",
        price: 2000,
        duration: 45,
        description: "Peinado para eventos",
      },
    ],
    employees: [
      {
        id: "e1",
        name: "Juan Pérez",
        role: "Estilista",
        services: [
          {
            id: "s1",
            name: "Corte",
            price: 1500,
            duration: 30,
            description: "Corte de cabello profesional",
          },
          {
            id: "s3",
            name: "Peinado",
            price: 2000,
            duration: 45,
            description: "Peinado para eventos",
          },
        ],
      },
      {
        id: "e2",
        name: "Lucía Gómez",
        role: "Colorista",
        services: [
          {
            id: "s2",
            name: "Teñido",
            price: 3000,
            duration: 60,
            description: "Coloración completa",
          },
        ],
      },
    ],
    business_hours: [
      {
        id: "bh1",
        day_of_week: "Lunes",
        opening_morning_time: "09:00",
        closing_morning_time: "18:00",
        opening_evening_time: null,
        closing_evening_time: null,
      },
      {
        id: "bh1",
        day_of_week: "Martes",
        opening_morning_time: "09:00",
        closing_morning_time: "18:00",
        opening_evening_time: null,
        closing_evening_time: null,
      },
    ],
  },
  {
    id: "2",
    name: "Centro de Belleza Luna",
    category: "Spa & Belleza",
    logo: "/placeholder.svg",
    open: true,
    address: {
      street: "Gurruchaga 567",
      city: "Palermo",
    },
    service: [
      {
        id: "s4",
        name: "Facial",
        price: 2500,
        duration: 50,
        description: "Limpieza facial profunda",
      },
      {
        id: "s5",
        name: "Manicura",
        price: 1200,
        duration: 30,
        description: "Manicura completa",
      },
      {
        id: "s6",
        name: "Masajes",
        price: 3500,
        duration: 60,
        description: "Masaje descontracturante",
      },
    ],
    employees: [
      {
        id: "e3",
        name: "Ana López",
        role: "Cosmetóloga",
        services: [
          {
            id: "s4",
            name: "Facial",
            price: 2500,
            duration: 50,
            description: "Limpieza facial profunda",
          },
          {
            id: "s6",
            name: "Masajes",
            price: 3500,
            duration: 60,
            description: "Masaje descontracturante",
          },
        ],
      },
      {
        id: "e4",
        name: "Marta Díaz",
        role: "Manicurista",
        services: [
          {
            id: "s5",
            name: "Manicura",
            price: 1200,
            duration: 30,
            description: "Manicura completa",
          },
        ],
      },
    ],
    business_hours: [
      {
        id: "bh2",
        day_of_week: "Martes",
        opening_morning_time: "10:00",
        closing_morning_time: "13:00",
        opening_evening_time: "15:00",
        closing_evening_time: "19:00",
      },
    ],
  },
  {
    id: "3",
    name: "Barbería Clásica",
    category: "Barbería",
    logo: "/placeholder.svg",
    open: false,
    address: {
      street: "Thames 890",
      city: "Palermo",
    },
    service: [
      {
        id: "s7",
        name: "Corte masculino",
        price: 1300,
        duration: 30,
        description: "Corte clásico para hombre",
      },
      {
        id: "s8",
        name: "Barba",
        price: 800,
        duration: 20,
        description: "Recorte y diseño de barba",
      },
      {
        id: "s9",
        name: "Afeitado",
        price: 1000,
        duration: 25,
        description: "Afeitado tradicional con navaja",
      },
    ],
    employees: [
      {
        id: "e5",
        name: "Carlos Herrera",
        role: "Barbero",
        services: [
          {
            id: "s7",
            name: "Corte masculino",
            price: 1300,
            duration: 30,
            description: "Corte clásico para hombre",
          },
          {
            id: "s8",
            name: "Barba",
            price: 800,
            duration: 20,
            description: "Recorte y diseño de barba",
          },
          {
            id: "s9",
            name: "Afeitado",
            price: 1000,
            duration: 25,
            description: "Afeitado tradicional con navaja",
          },
        ],
      },
    ],
    business_hours: [
      {
        id: "bh3",
        day_of_week: "Miércoles",
        opening_morning_time: "08:00",
        closing_morning_time: "18:00",
        opening_evening_time: null,
        closing_evening_time: null,
      },
    ],
  },
  {
    id: "4",
    name: "Nails & Beauty",
    category: "Manicura",
    logo: "/placeholder.svg",
    open: true,
    address: {
      street: "Humboldt 123",
      city: "Palermo",
    },
    service: [
      {
        id: "s17",
        name: "Manicura",
        price: 1300,
        duration: 30,
        description: "Manicura completa",
      },
      {
        id: "s18",
        name: "Pedicura",
        price: 1400,
        duration: 40,
        description: "Pedicura profesional",
      },
    ],
    employees: [
      {
        id: "e6",
        name: "Florencia Ruiz",
        role: "Manicurista",
        services: [
          {
            id: "s17",
            name: "Manicura",
            price: 1300,
            duration: 30,
            description: "Manicura completa",
          },
          {
            id: "s18",
            name: "Pedicura",
            price: 1400,
            duration: 40,
            description: "Pedicura profesional",
          },
        ],
      },
    ],
    business_hours: [
      {
        id: "bh4",
        day_of_week: "Jueves",
        opening_morning_time: "11:00",
        closing_morning_time: "14:00",
        opening_evening_time: "16:00",
        closing_evening_time: "20:00",
      },
    ],
  },
  {
    id: "5",
    name: "Estética Integral",
    category: "Centro de Estética",
    logo: "/placeholder.svg",
    open: true,
    address: {
      street: "Borges 345",
      city: "Palermo",
    },
    service: [
      {
        id: "s10",
        name: "Depilación",
        price: 1500,
        duration: 30,
        description: "Depilación con cera",
      },
      {
        id: "s11",
        name: "Tratamientos",
        price: 4000,
        duration: 60,
        description: "Tratamientos corporales",
      },
    ],
    employees: [
      {
        id: "e7",
        name: "Julieta Ríos",
        role: "Esteticista",
        services: [
          {
            id: "s10",
            name: "Depilación",
            price: 1500,
            duration: 30,
            description: "Depilación con cera",
          },
        ],
      },
      {
        id: "e8",
        name: "Valentina Soto",
        role: "Esteticista Senior",
        services: [
          {
            id: "s11",
            name: "Tratamientos",
            price: 4000,
            duration: 60,
            description: "Tratamientos corporales",
          },
        ],
      },
    ],
    business_hours: [
      {
        id: "bh5",
        day_of_week: "Viernes",
        opening_morning_time: "09:00",
        closing_morning_time: "17:00",
        opening_evening_time: null,
        closing_evening_time: null,
      },
    ],
  },
];

const getBusiness = (): PropsBusiness[] => {
  try {
    return negocios;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getBusinessById = (id: string): PropsBusiness | undefined => {
  try {
    return negocios.find((negocio) => negocio.id === id);
  } catch (error) {
    console.error(`Error al obtener el negocio con id ${id}:`, error);
    return undefined;
  }
};

export default getBusiness;
