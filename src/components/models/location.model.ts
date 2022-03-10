export interface ILocation {
  id: string | null
  name: string,
  photoUrl?: string,
  location?: string | null
}

export class Location implements ILocation {
  id: string | null;
  name: string;
  photoUrl?: string;
  location?: string | null;
  constructor(id: string, location: any) {
    this.id = id;
    this.name = location.name;
    this.photoUrl = location.photoUrl || '';
    this.location = location.parentId || null;
  }
}

