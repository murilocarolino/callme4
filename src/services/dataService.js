import { db } from './firebase';
import { collection, getDocs } from "firebase/firestore/lite";

// Função para obter dados de uma coleção
export async function getCities() {
  const citiesCol = collection(db, 'cities'); // Substitua 'cities' pelo nome da sua coleção
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map(doc => doc.data());
  return cityList;
}