export interface IEnderecoDTO {
  idx: string;
  uuid_tipo_endereco: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento?: string;
  referencia?: string;
  bairro: string;
  cidade: string;
  uf: string;
}
