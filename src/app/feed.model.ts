
export interface Feeds {
 
    by: string;
    descendants :number;
    id:number;
    title: string;
    score?: number;
    time?: number;
    url?: string;
    type?: string;
     
}

export interface FeedsResponse {
 
     data : Feeds[] ;
     errors :string;
     message:string;
     pageNumber :number;
     pageSize:number;
     succeeded:boolean;
     totalPages:number;
      


     
}
