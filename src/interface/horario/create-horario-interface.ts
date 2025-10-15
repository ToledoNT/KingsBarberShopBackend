export interface ICreateHorario {
  profissionalId: string;       
  data: Date;             
  inicio: string;         
  fim: string;            
  disponivel?: boolean;   
}