export class RateOfInterestOfBankModel {
    Id :number;
    UserId :number;
    IsPublished :boolean;
    TimePeriodId :number;
    RateOfInterest: number;
    DateCreated :Date;
    DateModified :Date;
    ModifiedBy: number;

   // GroupIds :string;
    TimePeriod:string;
    IsDoubleTapped:boolean;
}
