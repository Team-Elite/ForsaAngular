export class UserModel {
     UserId :number;
     UserTypeId: number;
     BankName :string;
     Address :string;
     ZipCode :string;
     City :string;
     CountryId :number=0;
     LanguageId :number;
     FirstName :string;
     LastName :string;
     UserName :string;
     Password :string;
     ContactNumber :string;
     EmailAddress :string;
     LongTermRatingAgency :string;
     LongTermRating :string;
     ShortTermRatingAgency :string;
     ShortTermRating :string;
     PromissaryNotesLenderOn : boolean;
     PromissaryNotesBorrower :boolean;
     MoneyMarket : boolean;
     DateCreated :Date;
     DateModified :Date;
     CreatedBy : number;
}
