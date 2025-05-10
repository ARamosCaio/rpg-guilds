import { useNavigate } from "react-router-dom";
import { GuildForm } from "./guildForm";

import { useState, useEffect } from "react";
import requester from "../axios";

export function Guilds() {
    const navigate = useNavigate();
    const [guilds, setGuilds] = useState([]);

    const updateGuilds = (data) => setGuilds([...guilds, data])
    
    useEffect(() => {
        const getGuilds = async () => {
            try {
                const response = await requester.get("/guilds");
                setGuilds(response.data);
            } catch (error) {
                console.error("Erro ao buscar as guildas:", error);
            }
        }
        getGuilds();
    }, []);

    const deleteGuild = async ({ id }) => {
        try {
            await requester.delete(`/guilds/${id}`);
            setGuilds(guilds.filter((guilds) => guilds.id !== id));
        }
        catch (error) {
            console.error("Erro ao deletar a guilda:", error);
        }
    }

    return (
        <div className="flex flex-col gap-4 p-5 text-orange-500">
            <h1>Guilda</h1>
            <ul>
                {guilds.map((guilds) => (
                    <li key={guilds.id} className="cursor-pointer flex gap-4 items-center">
                        {guild.name}
                        <button onClick={() => navigate(guilds.id)}>Editar</button>
                        <button onClick={() => deleteGuild(guilds)}>Excluir</button>
                    </li>

                ))}
            </ul>
            <GuildForm updateGuilds={updateGuilds} />
        </div>
    );
}