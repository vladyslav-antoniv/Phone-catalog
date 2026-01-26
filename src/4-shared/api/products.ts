import { Product, FullProduct } from "@/entities/product/model/types";
import { api } from '@/shared/api/axios';
import { SortBy } from "@/entities/product/model/productSlice";

// === 1. GET ALL PRODUCTS ===
export async function getAllProducts(): Promise<Product[]> {
    try {
        const response = await api.get<Product[]>('/api/products.json');
        
        // 🔍 LOG THIS to see what you actually get
        console.log("API RAW RESPONSE:", response); 

        // 🛠 FIX: Check if 'response' is already the array, or if it's inside '.data'
        const data = Array.isArray(response) ? response : response.data;

        return data || []; 
    } catch (e) {
        console.error("Error fetching products:", e);
        return [];
    }
}

// GET FULL PRODUCTS
export async function getFullProducts(category: string): Promise<FullProduct[]> {
    try {
        const response = await api.get<FullProduct[]>(`/api/${category}.json`);
        
        const data = Array.isArray(response) ? response : response.data;
        
        return data || [];
    } catch (e) {
        console.error(`Error fetching ${category}:`, e);
        return [];
    }
}

// GET DETAILS
export const getProductDetails = async (slug: string | number): Promise<FullProduct | null> => {
    try {
        const [phonesRes, tabletsRes, accessoriesRes] = await Promise.all([
            api.get<FullProduct[]>('/api/phones.json'),
            api.get<FullProduct[]>('/api/tablets.json'),
            api.get<FullProduct[]>('/api/accessories.json'),
        ]);

        // Helper to extract data safely
        const extractData = (res: any) => Array.isArray(res) ? res : (res.data || []);

        const allItems = [
            ...extractData(phonesRes), 
            ...extractData(tabletsRes), 
            ...extractData(accessoriesRes)
        ];

        const product = allItems.find((item) => item.id === slug || item.namespaceId === slug);
        return product || null;
    } catch (error) {
        console.error("API Details Error:", error);
        return null;
    }
};

// prepareData helper remains the same
export function prepareData(data: Product[], category: string, sortBy: SortBy, searchQuery: string) {
    const filtered = data.filter((product) => {
        const matchesCategory = product.category === category;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return filtered.sort((p1, p2) => {
        const key = sortBy.param;
        const value1 = p1[key];
        const value2 = p2[key];

        if (typeof value1 === 'string' && typeof value2 === 'string') {
            return sortBy.order === 'asc'
                ? value1.localeCompare(value2)
                : value2.localeCompare(value1);
        }

        if (typeof value1 === 'number' && typeof value2 === 'number') {
            return sortBy.order === 'asc'
                ? value1 - value2
                : value2 - value1;
        }

        return 0;
    });
}