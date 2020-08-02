export class UserModel {
    Username: string;  
    Password: string;  
    DateOfBirth: Date;  
    Email: string;  
    RoleId: string;  
    IsActive: string;
}

export class UserInfo {
    Firstname: string;
    Lastname: string;
    Username: string;  
    Password: string;  
    DateOfBirth: Date;  
    Email: string;  
    RoleId: number;  
    IsActive: boolean;
}

export class UserInfoModel {
    Id: number;
    Firstname: string;
    Lastname: string;
    Username: string;  
    Password: string;  
    DateOfBirth: Date;  
    Email: string;  
    RoleId: number;  
    IsActive: boolean;
}

export class FieldWorkModel {
    Id:number;
    Firstname: string;
    Lastname: string;
    FullName: string;  
    WeightType: number;  
    Weight: number;  
    UserId: number;
    Date: Date;
    PriceId: number;
}

export class PriceModel {
    Id:number;
    Name: string;
    UnitPrice: number;
    Description: string;
}

export class UserPriceDetailModel {
    Id:number;
    UserId: number;
    CreditAmount: number;
    DebitAmount: number;
    Date:Date;
}

export class DashboardModel {
    name: string;
    value: number;
}

export class SearchModel {
    UserId: number;
    ViewType: number;
    StartDate: Date;
    EndDate: Date;
}

export class ProductModel {
    Id: number;
    Name: string;
    Description: string;
}

export class ProductCategoryModel {
    Id: number;
    Name: string;
    Description: string;
}

export class ProductPriceDetailModel {
    id: number;
    productId: number;
    productCategoryId: number;
    quantity: number;
    weightType: number;
    unitPrice: number;
    total: number;
    date: Date;
    buyOrSell: number;
    productName:string;
    productCategoryName:string;
}