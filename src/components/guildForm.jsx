import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import requester from "../axios";



export function GuildForm(props) {
    const { guildId } = useParams();
    const [guild, setGuild] = useState();
    const navigate = useNavigate();


    const addGuild = async (guild) => {
    const { name } = guild;
    const create = { name };

    try {
        const response = await requester.post("/guilds", create);
        props.updateGuilds?.(response.data);
    }
    catch (error) {
        console.error("Erro ao adicionar a guilda:", error);
    }

    };

    

    useEffect(() => {
        const getGuild = async () => {
            try {
                const response = await requester.get(`/guilds/${guildId}`);
                setGuild(response.data)
            } catch (error) {
                console.error("Erro ao buscar a guilda:", error)
            }
        };
        if (guildId) getGuild();
    }, [guildId]);

    const editGuild = async (guild) => {
        const {id, name} = guild;

        const updated = {
            name,
        }

        try {
            const response = await requester.patch(`/guilds/${id}`, updated);
            setGuild(response.data)
            
        } catch (error) {
            console.error("Erro ao editar a guilda:", error)
        }
    };

    const handleSubmit = guildId ? editGuild : addGuild;

    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmit(guild);
        navigate("/guilds")
    }


    
    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-4 text-orange-500">
            <div className="flex flex-col gap-1">
                <label>Guilda</label>
                <input
                name="name"
                type="text"
                defaultValue={guild?.name}
                onChange={(e) => setGuild((prev) => ({ ...prev, name: e.target.value}))}
                />
            </div>
            
            <button type="submit" className="w-fit">Confirmar</button>
        </form>
    );
}