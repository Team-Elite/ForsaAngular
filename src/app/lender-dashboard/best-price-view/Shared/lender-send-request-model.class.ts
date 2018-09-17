export class LenderSendRequestModel {
    RequestId :number;
    LenderId :number;
    BorrowerId :number;
    LenderName:string;
    BorrowerName:string;
    Amount :number;
    StartDate :string;
    EndDate :string
    NoOfDays :number
    InterestConvention :string;
    Payments :string;
    IsRequestAccepted :boolean;
    DateCreated :Date;
    DateModified :Date;
    RequestCreatedBy :number;
}
