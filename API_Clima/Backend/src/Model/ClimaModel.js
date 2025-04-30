import db from '../conexao.js';
import mysql from 'mysql2/promise';

const conexao = mysql.createPool(db);

 export const criandolocalidade = async (nome, estado, pais) => {
    console.log("ClimaModel :: criandoLocalidade");

    const sql = `INSERT INTO localidades (nome, estado, pais) VALUES (?, ?, ?)`;

    const params = [nome, estado, pais];

    try {
        const [resposta] = await conexao.query(sql, params);
        return [201, {mensagem: 'Localidade criada com sucesso'}];
    } catch (error) {
        console.error({mensagem: "Erro ao criar Localidade", code:error.code, sql:error.sqlMessage});
        return [500, {mensagem: "Erro ao criar Localidade", code:error.code, sql:error.sqlMessage}]
    }
}

export const mostrandoLocalidade = async () => {
    console.log("ClimaModel :: mostrandoLocalidade");
    const sql = `SELECT * FROM localidades`;
    try {
        const [resposta] = await conexao.query(sql);
        return [200, resposta];
    } catch (error) {
        console.error({mensagem: "Erro ao mostrar Localidade", code:error.code, sql:error.sqlMessage});
        return [500, {mensagem: "Erro ao mostrar Localidade", code:error.code, sql:error.sqlMessage}]
    }
}

export const criandoRegistro = async (horario, data, temperatura, Localidades_id_Localidades) => {
    console.log("ClimaModel :: crinadoRegistro");
    const sql = `INSERT INTO registro (horario, data, temperatura, Localidades_id_Localidades) VALUES (?, ?, ?, ?)`;
    const params = [horario, data, temperatura, Localidades_id_Localidades,];

    try {
        const [resposta] = await conexao.query(sql, params);
        return [201, {mensagem: 'Registro criado com sucesso'}];
    } catch (error) {
        console.error({mensagem: "Erro ao criar Registro", code:error.code, sql:error.sqlMessage});
        return [500, {mensagem: "Erro ao criar Registro", code:error.code, sql:error.sqlMessage}]
    }
}
export const mostrandoRegistro = async () => {
    console.log("ClimaModel :: mostrandoRegistro");
    const sql = `
        SELECT 
            registro.id_registro,
            registro.horario,
            registro.data,
            registro.temperatura,
            localidades.nome AS nome_localidade,
            localidades.estado AS estado_localidade,
            localidades.pais AS pais_localidade
        FROM registro
        INNER JOIN localidades 
        ON registro.Localidades_id_Localidades = localidades.id_localidades
    `;
    try {
        const [resposta] = await conexao.query(sql);
        return [200, resposta];
    } catch (error) {
        console.error({mensagem: "Erro ao mostrar Registro", code:error.code, sql:error.sqlMessage});
        return [500, {mensagem: "Erro ao mostrar Registro", code:error.code, sql:error.sqlMessage}]
    }
}
