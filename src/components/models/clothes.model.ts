export interface IClothes {
  id: string | null
  brandId: string | null
  brand: string
  statusId: string | null
  status: string
  tagId: string[]
  photoUrl: string
  description?: string
}

export class Clothes implements IClothes {
  id: string | null;
  brandId: string | null;
  brand: string;
  statusId: string | null;
  status: string;
  tagId: string[];
  photoUrl: string;
  description?: string;
  constructor(id: string, clothes: any) {
    this.id = id;
    this.brandId = clothes.brandId;
    this.brand = clothes.brand;
    this.statusId = clothes.statusId;
    this.status = clothes.status;
    this.tagId = clothes.tagId || [];
    this.photoUrl = clothes.photoUrl || '';
    this.description = clothes.description || '';
  }
}

