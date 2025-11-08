import { promises as fs } from 'fs';

const photoData = [
  {
    "id": "1",
    "name": "Shri. Tejasvi Surya",
    "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Tejasvi_Surya_in_2024.jpg/220px-Tejasvi_Surya_in_2024.jpg"
  },
  {
    "id": "2",
    "name": "Shri. P C Mohan",
    "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/P._C._Mohan.jpg/220px-P._C._Mohan.jpg"
  },
  {
    "id": "3",
    "name": "Dr. C N Manjunath",
    "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/C._N._Manjunath_%28cropped%29.jpg/220px-C._N._Manjunath_%28cropped%29.jpg"
  },
  {
    "id": "4",
    "name": "Kum. Shobha Karandlaje",
    "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Shobha_Karandlaje_%28cropped%29.jpg/220px-Shobha_Karandlaje_%28cropped%29.jpg"
  },
  {
    "id": "5",
    "name": "Shri. H D Kumaraswamy",
    "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/H._D._Kumaraswamy_in_2024.jpg/220px-H._D._Kumaraswamy_in_2024.jpg"
  },
  {
    "id": "6",
    "name": "Shri. Jagadish Shettar",
    "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Jagadish_Shettar_in_2024.jpg/220px-Jagadish_Shettar_in_2024.jpg"
  },
  {
    "id": "7",
    "name": "Kum. Priyanka Satish Jarkiholi",
    "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Priyanka_Jarkiholi_2024.jpg/220px-Priyanka_Jarkiholi_2024.jpg"
  },
  {
    "id": "8",
    "name": "Shri. Pralhad Joshi",
    "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Pralhad_Joshi_in_2024.jpg/220px-Pralhad_Joshi_in_2024.jpg"
  },
  {
    "id": "9",
    "name": "Dr. K Sudhakar",
    "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/K._Sudhakar_in_2024.jpg/220px-K._Sudhakar_in_2024.jpg"
  },
  {
    "id": "10",
    "name": "Shri. Yaduveer Wadiyar",
    "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Yaduveer_Krishnadatta_Chamaraja_Wadiyar_in_2024.jpg/220px-Yaduveer_Krishnadatta_Chamaraja_Wadiyar_in_2024.jpg"
  },
  {
    "id": "11",
    "name": "Shri. B Y Raghavendra",
    "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/B._Y._Raghavendra_in_2024.jpg/220px-B._Y._Raghavendra_in_2024.jpg"
  },
  {
    "id": "12",
    "name": "Shri. Basavaraj Bommai",
    "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Basavaraj_Bommai_in_2024.jpg/220px-Basavaraj_Bommai_in_2024.jpg"
  },
  {
    "id": "13",
    "name": "Shri. Ramesh Chandappa Jigajinagi",
    "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Ramesh_Jigajinagi_2024.jpg/220px-Ramesh_Jigajinagi_2024.jpg"
  },
  {
    "id": "14",
    "name": "Shri. Govind Makthappa Karjol",
    "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Govind_Karjol_in_2024.jpg/220px-Govind_Karjol_in_2024.jpg"
  },
  {
    "id": "15",
    "name": "Shri. V Somanna",
    "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/V._Somanna_in_2024.jpg/220px-V._Somanna_in_2024.jpg"
  },
  {
    "id": "16",
    "name": "Shri. Kota Srinivasa Poojary",
    "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Kota_Srinivas_Poojary_2024.jpg/220px-Kota_Srinivas_Poojary_2024.jpg"
  },
  {
    "id": "17",
    "name": "Shri. Vishveshwer Hegde Kageri",
    "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Vishweshwar_Hegde_Kageri_2024.jpg/220px-Vishweshwar_Hegde_Kageri_2024.jpg"
  },
  {
    "id": "18",
    "name": "Shri. Captain Brijesh Chowta",
    "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Brijesh_Chowta_2024.jpg/220px-Brijesh_Chowta_2024.jpg"
  },
  {
    "id": "19",
    "name": "Shri. GADDIGOUDAR PARVTAGOUDA CHANDANAGOUDA",
    "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Parvatagouda_Chandanagouda_Gaddigoudar_2024.jpg/220px-Parvatagouda_Chandanagouda_Gaddigoudar_2024.jpg"
  },
  {
    "id": "20",
    "name": "Shri. M Mallesh Babu",
    "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/M._Mallesh_Babu_2024.jpg/220px-M._Mallesh_Babu_2024.jpg"
  },
  {
    "id": "21",
    "name": "Shri. E Tukaram",
    "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/E._Tukaram_2024.jpg/220px-E._Tukaram_2024.jpg"
  },
  {
    "id": "22",
    "name": "Shri. Sagar Eshwar Khandre",
    "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Sagar_Eshwar_Khandre_2024.jpg/220px-Sagar_Eshwar_Khandre_2024.jpg"
  },
  {
    "id": "23",
    "name": "Shri. Sunil Bose",
    "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Sunil_Bose_MP_2024.jpg/220px-Sunil_Bose_MP_2024.jpg"
  },
  {
    "id": "24",
    "name": "Dr. Prabha Mallikarjun",
    "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Prabha_Mallikarjun_2024.jpg/220px-Prabha_Mallikarjun_2024.jpg"
  },
  {
    "id": "25",
    "name": "Shri. Radhakrishna",
    "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Radhakrishna_Doddamani_2024.jpg/220px-Radhakrishna_Doddamani_2024.jpg"
  },
  {
    "id": "26",
    "name": "Shri. Shreyas M Patel",
    "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Shreyas_M._Patel_2024.jpg/220px-Shreyas_M._Patel_2024.jpg"
  },
  {
    "id": "27",
    "name": "Shri. Rajashekar Basavaraj K Hitnal",
    "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/K._Rajashekar_Basavaraj_Hitnal_2024.jpg/220px-K._Rajashekar_Basavaraj_Hitnal_2024.jpg"
  },
  {
    "id": "28",
    "name": "Shri. G Kumar Naik",
    "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/G._Kumar_Naik_2024.jpg/220px-G._Kumar_Naik_2024.jpg"
  }
];

async function updatePhotos() {
  try {
    // Read the existing mps.json file
    const data = await fs.readFile('mps.json', 'utf8');
    const mps = JSON.parse(data);
    
    // Create a map of IDs to photo URLs for quick lookup
    const photoMap = new Map();
    photoData.forEach(mp => {
      photoMap.set(mp.id, mp.photo_url);
    });
    
    // Update the profile_image_url for each MP
    const updatedMps = mps.map(mp => {
      if (photoMap.has(mp.id)) {
        return {
          ...mp,
          profile_image_url: photoMap.get(mp.id)
        };
      }
      return mp;
    });
    
    // Write the updated data back to the file
    await fs.writeFile('mps.json', JSON.stringify(updatedMps, null, 2));
    console.log('Successfully updated MP photos!');
    
  } catch (error) {
    console.error('Error updating MP photos:', error);
  }
}

// Run the update function
updatePhotos().catch(console.error);
