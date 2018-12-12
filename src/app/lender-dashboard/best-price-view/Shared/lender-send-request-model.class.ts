export class LenderSendRequestModel {
    RequestId :number;
    LenderId :number;
    BorrowerId :number;
    LenderName:string;
    BorrowerName:string;
    Amount :any;
    StartDate :string;
    EndDate :string
    NoOfDays :number
    InterestConvention :string;
    Payments :string;
    IsRequestAccepted :boolean;
    DateCreated :Date;
    DateModified :Date;
    RequestCreatedBy :number;
    InterestConventionName:string;
    PaymentsName:string;
    LenderEmailId:string;
    IsAccepted:boolean;
    IsRejected:boolean;
    RateOfInterest:number;
    BorrowerEmailId:string;
    MessageForForsa:string;
    IsMessageSentToForsa:boolean;

}
