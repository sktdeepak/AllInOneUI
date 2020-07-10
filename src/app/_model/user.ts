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
}

export class PriceModel {
    Id:number;
    Name: string;
    UnitPrice: number;
    Description: string;
}
