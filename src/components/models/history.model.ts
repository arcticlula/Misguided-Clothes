export interface IClothesHistory {
  id: string | null
  clothesId: string | null
  statusId: string | null
  status: string
  locationId: string | null
  location: string;
  date: Date  
}

export class ClothesHistory implements IClothesHistory {
  id: string | null;
  clothesId: string | null;
  statusId: string | null;
  status: string;
  locationId: string | null;
  location: string;
  date: Date;
  constructor(id: string, history: any) {
    this.id = id;
    this.clothesId = history.clothesId;
    this.statusId = history.statusId;
    this.status = history.status;
    this.locationId = history.locationId;
    this.location = history.location;
    this.date = history.date.toDate().toLocaleString();
  }
}

