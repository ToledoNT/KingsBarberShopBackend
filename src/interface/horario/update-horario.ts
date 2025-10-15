export interface IUpdateHorario {
  id: string;              
  profissionalId?: string; 
  data?: Date;             
  inicio?: string;         
  fim?: string;            
  disponivel?: boolean;    
}