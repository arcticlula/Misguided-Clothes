export interface IBrand {
  id: string | null
  name: string,
  photoUrl: string,
  parentId?: string | null
  parentName?: string
}

export class Brand implements IBrand {
  id: string | null;
  name: string;
  photoUrl: string;
  parentId?: string | null;
  parentName?: string;
  constructor(id: string, brand: any) {
    this.id = id;
    this.name = brand.name;
    this.photoUrl = brand.photoUrl || '';
    this.parentId = brand.parentId || null;
    this.parentName = brand.parentName || '';
  }
}

