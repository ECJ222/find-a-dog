// utility functions.
import { http } from "@/utils/axios";

function getUniqueDogBreeds(current_breeds, data) {
  const breedsSet = new Set(current_breeds);
  return data.filter((dogs_images) => !breedsSet.has(dogs_images));
}

export async function getBreeds(data, max_amount) {
  const breeds = [...data];
  let count = 0;
  while (count < max_amount) {
    const response = await http.get("/breeds/image/random/50");
    const uniqueBreeds = getUniqueDogBreeds(breeds, response.data.message);
    const data = uniqueBreeds.slice(0, max_amount - count);
    breeds.push(...data);
    count += data.length;
  }

  return breeds;
}

export function getBreedsAndSubBreeds(response) {
  let breedsAndSubBreeds = [];
  for (const breed in response) {
    if (response[breed].length === 0) {
      breedsAndSubBreeds.push(breed);
    } else {
      for (const subBreed of response[breed]) {
        breedsAndSubBreeds.push(`${breed}-${subBreed}`);
      }
    }
  }
  return breedsAndSubBreeds;
}

export function searchBreedsAndSubBreeds(breed_list, searchText) {
  // lookup by breeds.
  return breed_list.filter((breed) => {
    return searchText.split(" ").some((char) => {
      const data = breed.split("-");
      console.log(data[0], char);
      if (data[0] === char) {
        return true;
      }

      return false;
    });
  });
}

export function debounce(fn, wait) {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), wait);
  };
}
