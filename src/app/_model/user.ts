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
    Id: number;
    ProductId: number;
    ProductCategoryId: number;
    Quantity: number;
    WeightType: number;
    UnitPrice: number;
    Total: number;
    Date: Date;
    BuyOrSell: number;
}