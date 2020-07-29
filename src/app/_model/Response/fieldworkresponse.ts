import { FieldWorkModel } from '../user';

export class Fieldworkresponse {
    DataList: FieldWorkModel[];
    IsSuccess: boolean;
    Error: boolean;
    CreditAmount: number;
    DebitAmount: number;
    StockAmount: number;
    TotalStock: number;
    LastAccessedTs: Date;
}
