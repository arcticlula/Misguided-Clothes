export enum StatusEnum {
  Normal,
  Washing,
  Used,
  Stored,
  OnLoan,
  Lost
}

export interface IStatus {
  id: string | null
  status: number,
  name: string,
  location?: string
  locationId?: string | null
}

export class Status implements IStatus {
  id: string | null;
  status: number;
  name: string;
  location: string;
  locationId?: string | null;
  constructor(id: string, status: any) {
    this.id = id;
    this.status = status.status || StatusEnum.Normal;
    this.name = 'Normal';
    this.location = '';
    this.locationId = status.locationId || null;
  }
}

export const defaultStatuses: IStatus[] = [
  {
    id: 'normal',
    status: StatusEnum.Normal,
    name: 'Normal'
  },
  {
    id: 'washing',
    status: StatusEnum.Washing,
    name: 'Washing'
  },
  {
    id: 'used',
    status: StatusEnum.Used,
    name: 'Used',
    locationId: null
  },
  {
    id: 'stored',
    status: StatusEnum.Stored,
    name: 'Stored',
    locationId: null
  },
  {
    id: 'onLoan',
    status: StatusEnum.OnLoan,
    name: 'On Loan',
    locationId: null
  },
  {
    id: 'lost',
    status: StatusEnum.Lost,
    name: 'Lost',
    locationId: null
  }
]