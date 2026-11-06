const API_KEY = import.meta.env.VITE_DOG_API_KEY;

// Log API Key
export function getAPIKey() {
    console.log(API_KEY);
}

// Fetch breeds from the API
export async function setBreedsData() {
    const response = await fetch(
        "https://api.thedogapi.com/v1/breeds",
        {
            headers: {
                "x-api-key": API_KEY,
            },
        }
    );

    const breeds = await response.json();

    console.log("Fetching breeds from TheDogAPI");

    saveBreeds(breeds);

    return breeds;
}

// Save breeds to localStorage
export function saveBreeds(breeds) {
    localStorage.setItem("breeds", JSON.stringify(breeds));
}

// Load breeds from localStorage
export function loadBreeds() {
    const breeds = localStorage.getItem("breeds");

    if (!breeds) {
        return null;
    }

    return JSON.parse(breeds);
}

// Initialize breed list
export async function initialize() {
    const breeds = loadBreeds();

    if (breeds && breeds.length > 0) {
        return breeds;
    }

    return await setBreedsData();
}

// Get a random breed
export function getRandomBreed(breeds) {
    const randomIndex = Math.floor(Math.random() * breeds.length);
    return breeds[randomIndex];
}

//Get the image from the breed id
export async function getBreedImage(breedId) {
    const response = await fetch(
        `https://api.thedogapi.com/v1/images/search?breed_ids=${breedId}`,
        {
            headers: {
                "x-api-key": API_KEY,
            },
        }
    );

   if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();

    console.log("Image API response:", data);

    return data[0]?.url || null;
}

