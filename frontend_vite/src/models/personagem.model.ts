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

export const getAtributeModifier = (atribute: number) => {

    if (atribute === 18) return "+3";
    if (atribute >= 16) return "+2";
    if (atribute >= 13) return "+1";
    if (atribute >= 9) return "+0";
    if (atribute >= 6) return "-1";
    if (atribute >= 4) return "-2";
    return "-3";
}