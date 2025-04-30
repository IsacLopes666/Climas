import { criandolocalidade, criandoRegistro, mostrandoLocalidade, mostrandoRegistro } from "../Model/ClimaModel.js";


export const createLocalidade = async (req, res) => {
    console.log("ClimaController :: criandoLocalidade");
    const {nome, estado, pais} = req.body;

    try {
        const [status, resposta] = await criandolocalidade(nome, estado, pais);
        return res. status(status).send(resposta);
    } catch (error) {
        return res.status(500).json({mensagem: "Erro ao criar Localidade"});
    }

}

export const readLocalidade = async (req, res) => {
console.log("ClimaController :: mostrandoLocalidade");

try {
    const [status, resposta] = await mostrandoLocalidade();
    return res.status(status).send(resposta);
} catch (error) {
    return res.status(500).json({mensagem: "Erro ao mostrar Localidade"});
}
}

export const createRegistro = async (req, res) => {
    console.log("ClimaController :: criandoRegistro");
    const {horario, data, temperatura, Localidades_id_localidades} = req.body;

    try {
        const [status, resposta] = await criandoRegistro(horario, data, temperatura, Localidades_id_localidades);
        return res.status(status).send(resposta);
    } catch (error) {
        return res.status(500).json({mensagem: "Erro ao criar Registro"});
    }
}

export const readRegistro = async (req, res) => {
    console.log("ClimaController :: mostrandoRegistro");

    try {
        const [status, resposta] = await mostrandoRegistro();
        return res.status(status).send(resposta);
    } catch (error) {
        return res.status(500).json({mensagem: "Erro ao mostrar Registro"});
    }
}
