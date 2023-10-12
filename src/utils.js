import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

export const getById = (id, path) => {
    const data = JSON.parse(fs.readFileSync(path, 'utf8'));
    return data.find((p) => p.id === id);
};

export const generateNewProductId = () => uuidv4();
export const generateNewCartId = () => uuidv4();