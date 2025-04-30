const API_BASE_URL = 'http://localhost:3000';

// Funções principais
async function carregarLocalidades() {
    try {
        const response = await fetch(`${API_BASE_URL}/localidade`);
        if (!response.ok) throw new Error('Erro ao carregar localidades');
        const localidades = await response.json();

        atualizarTabelaLocalidades(localidades);
        atualizarDropdownLocalidades(localidades);
    } catch (error) {
        console.error('Erro ao carregar localidades:', error);
        alert('Erro ao carregar localidades: ' + error.message);
    }
}

async function carregarRegistros() {
    try {
        const response = await fetch(`${API_BASE_URL}/registro`);
        if (!response.ok) throw new Error('Erro ao carregar registros');
        const registros = await response.json();

        atualizarTabelaRegistros(registros);
    } catch (error) {
        console.error('Erro ao carregar registros:', error);
        alert('Erro ao carregar registros: ' + error);
    }
}

// Atualizar tabelas
function atualizarTabelaLocalidades(localidades) {
    const tabela = document.querySelector('#tabelaLocalidades tbody');
    tabela.innerHTML = '';

    localidades.forEach(localidade => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${localidade.id_localidades}</td>
            <td>${localidade.nome}</td>
            <td>${localidade.estado}</td>
            <td>${localidade.pais}</td>
            <td><button onclick="excluirLocalidade(${localidade.id_localidades})" style="background-color: #e53935; color: white; border: none; padding: 5px 10px;">🗑️ Excluir</button></td>
        `;
        tabela.appendChild(row);
    });
}

function atualizarTabelaRegistros(registros) {
    const tabela = document.querySelector('#tabelaRegistros tbody');
    tabela.innerHTML = '';

    registros.forEach(registro => {
        const dataObj = registro.data ? new Date(registro.data) : null;
        const dataFormatada = dataObj ?
            `${dataObj.getFullYear()}-${(dataObj.getMonth() + 1).toString().padStart(2, '0')}-${dataObj.getDate().toString().padStart(2, '0')}` :
            'N/A';

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${registro.id_registro}</td>
            <td>${dataFormatada}</td>
            <td>${registro.horario || 'N/A'}</td>
            <td>${registro.temperatura != null ? registro.temperatura + '°C' : 'N/A'}</td>
            <td>${registro.nome_localidade} - ${registro.estado_localidade}</td>
            <td><button onclick="excluirRegistro(${registro.id_registro})" style="background-color: #e53935; color: white; border: none; padding: 5px 10px;">🗑️ Excluir</button></td>
        `;
        tabela.appendChild(row);
    });
}

// Atualizar dropdown
function atualizarDropdownLocalidades(localidades) {
    const dropdown = document.getElementById('localidadeRegistro');
    dropdown.innerHTML = '<option value="">Selecione uma localidade</option>';

    localidades.forEach(localidade => {
        const option = document.createElement('option');
        option.value = localidade.id_localidades;
        option.textContent = `${localidade.nome}, ${localidade.estado} (${localidade.pais})`;
        dropdown.appendChild(option);
    });
}

// Adicionar localidade
async function adicionarLocalidade() {
    const nome = document.getElementById('nomeLocalidade').value.trim();
    const estado = document.getElementById('estadoLocalidade').value.trim();
    const pais = document.getElementById('paisLocalidade').value.trim();

    if (!nome || !estado || !pais) {
        alert('Preencha todos os campos da localidade');
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/localidade`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, estado, pais }),
        });

        if (!response.ok) throw new Error('Erro ao adicionar localidade');

        document.getElementById('nomeLocalidade').value = '';
        document.getElementById('estadoLocalidade').value = '';
        document.getElementById('paisLocalidade').value = '';

        await carregarLocalidades();
        alert('Localidade adicionada com sucesso!');
    } catch (error) {
        console.error('Erro ao adicionar localidade:', error);
        alert('Erro ao adicionar localidade: ' + error.message);
    }
}

// Adicionar registro
async function adicionarRegistro() {
    const horario = document.getElementById('horarioRegistro').value;
    const data = document.getElementById('dataRegistro').value;
    const temperatura = parseFloat(document.getElementById('temperaturaRegistro').value);
    const localidadeId = document.getElementById('localidadeRegistro').value;

    if (!horario || !data || isNaN(temperatura) || !localidadeId) {
        alert('Preencha todos os campos do registro corretamente');
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/registro`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                horario,
                data,
                temperatura,
                Localidades_id_localidades: parseInt(localidadeId)
            }),
        });

        if (!response.ok) throw new Error('Erro ao adicionar registro');

        document.getElementById('horarioRegistro').value = '';
        document.getElementById('dataRegistro').value = '';
        document.getElementById('temperaturaRegistro').value = '';
        document.getElementById('localidadeRegistro').value = '';

        await carregarRegistros();
        alert('Registro adicionado com sucesso!');
    } catch (error) {
        console.error('Erro ao adicionar registro:', error);
        alert('Erro ao adicionar registro: ' + error.message);
    }
}

// Excluir localidade
async function excluirLocalidade(id) {
    if (!confirm('Tem certeza que deseja excluir esta localidade?')) return;

    try {
        const response = await fetch(`${API_BASE_URL}/localidade/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Erro ao excluir localidade');

        alert('Localidade excluída!');
        carregarLocalidades();
        carregarRegistros();
    } catch (error) {
        console.error('Erro ao excluir localidade:', error);
        alert('Erro ao excluir localidade: ' + error.message);
    }
}

// Excluir registro
async function excluirRegistro(id) {
    if (!confirm('Tem certeza que deseja excluir este registro?')) return;

    try {
        const response = await fetch(`${API_BASE_URL}/registro/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Erro ao excluir registro');

        alert('Registro excluído!');
        carregarRegistros();
    } catch (error) {
        console.error('Erro ao excluir registro:', error);
        alert('Erro ao excluir registro: ' + error.message);
    }
}

// Evento principal
document.addEventListener('DOMContentLoaded', () => {
    carregarLocalidades();
    carregarRegistros();

    const btnAddLocalidade = document.querySelector('.localidades button');
    if (btnAddLocalidade) {
        btnAddLocalidade.addEventListener('click', adicionarLocalidade);
    }

    const btnAddRegistro = document.querySelector('.registros button');
    if (btnAddRegistro) {
        btnAddRegistro.addEventListener('click', adicionarRegistro);
    }
});
