export interface Habilidade {
    id: number;
    forca: number;
    destreza: number;
    constituicao: number;
    inteligencia: number;
    sabedoria: number;
    carisma: number;
}

// Interface para Personagem.ts
export interface Personagem {
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

export interface FetchPersonagemList {
    status: boolean;
    message: string;
    data: Personagem[];
}
export interface FetchPersonagem {
    status: boolean;
    message: string;
    data: Personagem;
}