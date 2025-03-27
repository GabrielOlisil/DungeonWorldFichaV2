export type Habilidade = {
    id: number;
    forca: number;
    destreza: number;
    constituicao: number;
    inteligencia: number;
    sabedoria: number;
    carisma: number;
}

// Interface para Personagem.ts
export type Personagem = {
    personagemId: number;
    imageUrl: string;
    nome: string;
    pv: number;
    pvTotal: number;
    armadura: number;
    dadoDano: number;
    nivel: number;
    classe: string;
    descricaoUm: string;
    equipamento: string;
    descricaoDois: string;
    habilidade: Habilidade;
}

export type FetchPersonagemList = {
    status: boolean;
    message: string;
    data: Personagem[];
}
export type FetchPersonagem = {
    status: boolean;
    message: string;
    data: Personagem;
}