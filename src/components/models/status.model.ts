export enum StatusEnum {
  Normal,
  Washing,
  Used,
  Stored,
  OnLoan,
  Lost,
  GaveAway,
  Discarded
}

export interface IStatus {
  id: string | null
  status: number,
  name: string
}

export const statusList: IStatus[] = [
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
    name: 'Used'
  },
  {
    id: 'stored',
    status: StatusEnum.Stored,
    name: 'Stored'
  },
  {
    id: 'onLoan',
    status: StatusEnum.OnLoan,
    name: 'On Loan'
  },
  {
    id: 'lost',
    status: StatusEnum.Lost,
    name: 'Lost'
  },
  {
    id: 'gaveAway',
    status: StatusEnum.GaveAway,
    name: 'Gave Away'
  },
  {
    id: 'discarded',
    status: StatusEnum.Discarded,
    name: 'Discarded'
  }
]