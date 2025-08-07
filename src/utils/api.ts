import type { Coffee } from '../types/coffee';

const API_URL = 'https://api.sampleapis.com/coffee';

export const fetchHotCoffees = async (): Promise<Coffee[]> => {
  const response = await fetch(`${API_URL}/hot`);
  if (!response.ok) throw new Error('Failed to fetch hot coffees');
  const data = await response.json();
  return data.map((coffee: Coffee) => ({
    ...coffee,
    price: Math.floor(Math.random() * 10) + 5, // Генерируем случайную цену
  }));
};

export const fetchIcedCoffees = async (): Promise<Coffee[]> => {
  const response = await fetch(`${API_URL}/iced`);
  if (!response.ok) throw new Error('Failed to fetch iced coffees');
  const data = await response.json();
  return data.map((coffee: Coffee) => ({
    ...coffee,
    price: Math.floor(Math.random() * 10) + 5,
  }));
};

export const fetchCoffeeById = async (id: string, type: 'hot' | 'iced'): Promise<Coffee> => {
  const response = await fetch(`${API_URL}/${type}`);
  if (!response.ok) throw new Error(`Failed to fetch ${type} coffee`);
  const data = await response.json();
  const coffee = data.find((c: Coffee) => c.id === parseInt(id));
  if (!coffee) throw new Error('Coffee not found');
  return {
    ...coffee,
    price: Math.floor(Math.random() * 10) + 5,
  };
};