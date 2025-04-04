import RollMovimentoTooltip, { RollMovimentoTooltipProps } from "./RollMovimentoTooltip";

const PlayDice = () => {

    return (
        <section className="pb-10">

            {movimentos.map((mov, index) => {

                return <RollMovimentoTooltip props={mov} key={index} />

            })}
        </section>
    )
}

const movimentos: RollMovimentoTooltipProps[] = [
    {
        movimento: "Desafiar o Perigo",
        atributo: "destreza",
        descricao: "Quando você se expõe a um perigo iminente, role +destreza para evitá-lo ou minimizar as consequências."
    },
    {
        movimento: "Matar e Pilhar",
        atributo: "forca",
        descricao: "Quando você usa uma arma corpo a corpo para atacar um inimigo, role +forca para causar dano e dominar o combate."
    },
    {
        movimento: "Atirar",
        atributo: "destreza",
        descricao: "Quando você atira uma arma à distância, role +destreza para atingir seu alvo com precisão."
    },
    {
        movimento: "Discernir a Realidade",
        atributo: "sabedoria",
        descricao: "Quando você observa o ambiente em busca de pistas, role +sabedoria para identificar o que realmente importa."
    },
    {
        movimento: "Revelar o Saber",
        atributo: "inteligencia",
        descricao: "Quando você tenta recordar informações importantes ou fatos relevantes, role +inteligencia para trazer à tona conhecimentos úteis."
    },
];

export default PlayDice;