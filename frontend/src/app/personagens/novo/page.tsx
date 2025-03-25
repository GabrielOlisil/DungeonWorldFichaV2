"use client"
import Notificacao, { notificacaoProps, notificacoes } from "@/components/notificacao";
import { FetchPersonagem, Personagem } from "@/models/personagem.model";

import { useRouter } from 'next/navigation';
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";



export default function CriarPersonagem() {

    const [notificacoes, setNotificacoes] = React.useState<notificacoes[]>([]);


    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Personagem>()

    const router = useRouter();

    const onSubmit: SubmitHandler<Personagem> = async (data) => {

        let personagem: Personagem = { ...data };


        personagem.pv = personagem.pvTotal;
        personagem.descricaoDois = ""
        personagem.descricaoUm = ""
        personagem.equipamento = ""
        personagem.nivel = 1;

        let body = JSON.stringify(personagem);

        try {
            var response = await fetch("http://localhost:080/api/personagens", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body
            });

            let personagem: FetchPersonagem = await response.json();

            if (response.ok) {
                router.push(`/personagens/${personagem.data.personagemId}/detalhar`)
                return;
            }

            throw new Error("Erro ao criar personagem");



        }
        catch {
            notificacoes.push({ content: "Erro ao inserir ", type: "error" });
        }


    }
    const [value, setValue] = React.useState("**Hello world!!!**");



    return (
        <>
            {notificacoes.length > 0 && <Notificacao props={notificacoes} />}
            <form onSubmit={handleSubmit(onSubmit)} className="md:w-4xl mx-auto p-6">


                <fieldset className="fieldset bg-base-200 border border-base-300 p-4 rounded-box flex justify-center mb-3">
                    <legend className="fieldset-legend">Criar Personagem</legend>
                    <section className="flex-1">

                        {/* Nome */}
                        <label className="fieldset-label">Nome</label>
                        <input
                            type="text"
                            {...register("nome", { required: true })}
                            placeholder="Um nome bonito"
                            className="input"
                        />
                        {errors.nome && <div className="text-error">Campo requerido</div>}


                        {/* Url de Imagem */}
                        <label className="fieldset-label mt-3">Url Imagem</label>
                        <input
                            type="text"
                            {...register("imageUrl", { required: true })}
                            placeholder="Url externa"
                            className="input"
                        />
                        {errors.imageUrl && <div className="text-error">Campo requerido</div>}

                        {/* Classe */}
                        <label className="fieldset-label mt-3">Classe</label>
                        <input
                            type="text"
                            {...register("classe", { required: true })}
                            placeholder="Classe"
                            className="input"
                        />
                        {errors.classe && <div className="text-error">Campo requerido</div>}


                        {/* PV Total */}
                        <label className="fieldset-label mt-3">PV Total</label>
                        <input
                            type="number"
                            {...register("pvTotal", { valueAsNumber: true, required: true })}
                            className="input"
                            placeholder="Vida total"

                        />
                        {errors.pvTotal && <div className="text-error">Campo requerido</div>}


                        {/* Armadura */}
                        <label className="fieldset-label mt-3">Armadura</label>
                        <input
                            type="number"
                            {...register("armadura", { valueAsNumber: true, required: true })}
                            placeholder="Armadura do personagem"
                            className="input"
                        />
                        {errors.armadura && <div className="text-error">Campo requerido</div>}


                        {/* Dado de Dano */}
                        <label className="fieldset-label mt-3">Dado de Dano</label>
                        <input
                            type="number"
                            {...register("dadoDano", { valueAsNumber: true, required: true })}
                            placeholder="Ex: 10 = d10"
                            className="input"
                        />
                        {errors.dadoDano && <div className="text-error">Campo requerido</div>}

                    </section>
                    <section className="flex-1">

                        <label className="fieldset-label ">Força</label>
                        <input
                            type="number"

                            {...register("habilidade.forca", {
                                valueAsNumber: true, required: true, min: 1, max: 20
                            })}
                            placeholder={`Ex: 16`}


                            className="input "
                        />
                        {errors.habilidade?.forca && errors.habilidade.forca.type === "required" &&
                            <div className="text-error">Campo Requerido</div>}
                        {errors.habilidade?.forca && (errors.habilidade.forca.type === "min" || errors.habilidade.forca.type === "max") &&
                            <div className="text-error">Valor deve estar entre 1 e 20</div>}


                        {/* Destreza */}
                        <label className="fieldset-label mt-3">Destreza</label>
                        <input
                            type="number"
                            placeholder={`Ex: 16`}

                            {...register("habilidade.destreza", { valueAsNumber: true, required: true, min: 1, max: 20 })}

                            className="input "
                        />
                        {errors.habilidade?.destreza && errors.habilidade.destreza.type === "required" &&
                            <div className="text-error">Campo Requerido</div>}
                        {errors.habilidade?.destreza && (errors.habilidade.destreza.type === "min" || errors.habilidade.destreza.type === "max") &&
                            <div className="text-error">Valor deve estar entre 1 e 20</div>}

                        {/* Constituição */}
                        <label className="fieldset-label mt-3">Constituição</label>
                        <input
                            type="number"
                            placeholder={`Ex: 16`}

                            {...register("habilidade.constituicao", { valueAsNumber: true, required: true, min: 1, max: 20 })}

                            className="input "
                        />

                        {errors.habilidade?.constituicao && errors.habilidade.constituicao.type === "required" &&
                            <div className="text-error">Campo Requerido</div>}
                        {errors.habilidade?.constituicao && (errors.habilidade.constituicao.type === "min" || errors.habilidade.constituicao.type === "max") &&
                            <div className="text-error">Valor deve estar entre 1 e 20</div>}


                        {/* Inteligência */}
                        <label className="fieldset-label mt-3">Inteligência</label>
                        <input
                            type="number"
                            placeholder={`Ex: 16`}

                            {...register("habilidade.inteligencia", { valueAsNumber: true, required: true, min: 1, max: 20 })}

                            className="input "
                        />

                        {errors.habilidade?.inteligencia && errors.habilidade.inteligencia.type === "required" &&
                            <div className="text-error">Campo Requerido</div>}
                        {errors.habilidade?.inteligencia && (errors.habilidade.inteligencia.type === "min" || errors.habilidade.inteligencia.type === "max") &&
                            <div className="text-error">Valor deve estar entre 1 e 20</div>}


                        {/* Sabedoria */}
                        <label className="fieldset-label mt-3">Sabedoria</label>
                        <input
                            type="number"
                            placeholder={`Ex: 16`}

                            {...register("habilidade.sabedoria", { valueAsNumber: true, required: true, min: 1, max: 20 })}

                            className="input "
                        />
                        {errors.habilidade?.sabedoria && errors.habilidade.sabedoria.type === "required" &&
                            <div className="text-error">Campo Requerido</div>}
                        {errors.habilidade?.sabedoria && (errors.habilidade.sabedoria.type === "min" || errors.habilidade.sabedoria.type === "max") &&
                            <div className="text-error">Valor deve estar entre 1 e 20</div>}


                        {/* Carisma */}
                        <label className="fieldset-label mt-3">Carisma</label>
                        <input
                            type="number"
                            placeholder={`Ex: 16`}

                            {...register("habilidade.carisma", { valueAsNumber: true, required: true, min: 1, max: 20 })}

                            className="input "
                        />
                        {errors.habilidade?.carisma && errors.habilidade.carisma.type === "required" &&
                            <div className="text-error">Campo Requerido</div>}
                        {errors.habilidade?.carisma && (errors.habilidade.carisma.type === "min" || errors.habilidade.carisma.type === "max") &&
                            <div className="text-error">Valor deve estar entre 1 e 20</div>}

                    </section>

                </fieldset>


             

                <input type="submit" className="btn btn-primary text-lg" value="Criar" />
            </form>
        </>


    )
}