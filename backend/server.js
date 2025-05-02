// backend/server.js

const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const crypto = require('crypto'); // Usaremos para gerar IDs no POST se necessário

const app = express();
const port = 3001; // Mantendo sua porta
const dbPath = path.join(__dirname, 'db.json'); // Caminho para o banco de dados JSON

// --- Middleware ---
app.use(cors({ origin: 'http://localhost:4200' })); // Permite APENAS localhost:4200
app.use(express.json()); // Habilita o parse de JSON
// -----------------

// --- Helper Functions (Ler/Escrever db.json) ---
const readDatabase = (callback) => {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            console.error(`[${new Date().toISOString()}] Erro ao ler ${dbPath}:`, err);
            return callback(err, null);
        }
        try {
            const jsonData = JSON.parse(data);
            callback(null, jsonData);
        } catch (parseError) {
            console.error(`[${new Date().toISOString()}] Erro ao fazer parse do ${dbPath}:`, parseError);
            callback(parseError, null);
        }
    });
};

const writeDatabase = (data, callback) => {
    const jsonString = JSON.stringify(data, null, 2); // Formata o JSON
    fs.writeFile(dbPath, jsonString, 'utf8', (err) => {
        if (err) {
            console.error(`[${new Date().toISOString()}] Erro ao escrever em ${dbPath}:`, err);
            return callback(err);
        }
        callback(null);
    });
};
// ---------------------------------------------

// --- ROTA DE LOGIN ---
app.post('/api/auth/login', (req, res) => {
    console.log(`[${new Date().toISOString()}] POST /api/auth/login`);
    const { login, senha } = req.body;
    if (!login || !senha) return res.status(400).json({ error: 'Login e Senha são obrigatórios.' });

    readDatabase((err, db) => {
        if (err) return res.status(500).json({ error: 'Erro interno ao ler dados para login.' });
        const voluntarios = Array.isArray(db?.voluntarios) ? db.voluntarios : [];
        const foundUser = voluntarios.find(user => user.login === login && user.senha === senha); // INSEGURO!
        if (foundUser) {
            console.log(` -> Sucesso login para: ${login}`);
            res.status(200).json({ message: 'Login bem-sucedido!', userId: foundUser.id, userName: foundUser.nome });
        } else {
            console.log(` -> Falha login para: ${login}`);
            res.status(401).json({ error: 'Login ou Senha inválidos.' });
        }
    });
});
// --------------------

// --- ROTA HOME (Exemplo) ---
app.get('/home', (req, res) => {
    console.log(`[${new Date().toISOString()}] GET /home`);
    readDatabase((err, db) => {
        if (err) return res.status(500).json({ error: 'Erro interno ao ler dados para home.' });
        res.status(200).json({
             totalVoluntarios: db?.voluntarios?.length || 0,
             totalEntidades: db?.entidades?.length || 0,
             totalAgendamentos: db?.agendamentos?.length || 0
        });
    });
});
// -------------------------


// ===============================================
// --- ROTAS CRUD para VOLUNTARIOS ---
// ===============================================
(() => { // Usando IIFE para escopo de 'resource' e 'singularName'
    const resource = 'voluntarios';
    const singularName = 'voluntario';

    // GET /voluntarios (Ler Todos)
    app.get(`/${resource}`, (req, res) => {
        console.log(`[${new Date().toISOString()}] GET /${resource}`);
        readDatabase((err, db) => {
            if (err) return res.status(500).json({ error: `Erro ao ler ${resource}.` });
            res.status(200).json(Array.isArray(db?.[resource]) ? db[resource] : []);
        });
    });

    // GET /voluntarios/:id (Ler Um)
    app.get(`/${resource}/:id`, (req, res) => {
        const id = req.params.id;
        console.log(`[${new Date().toISOString()}] GET /${resource}/${id}`);
        readDatabase((err, db) => {
            if (err) return res.status(500).json({ error: `Erro ao ler ${resource}.` });
            const items = Array.isArray(db?.[resource]) ? db[resource] : [];
            const item = items.find(i => String(i.id) === String(id));
            if (item) {
                res.status(200).json(item);
            } else {
                res.status(404).json({ error: `${singularName} não encontrado.` });
            }
        });
    });

    // POST /voluntarios (Criar)
    app.post(`/${resource}`, (req, res) => {
        console.log(`[${new Date().toISOString()}] POST /${resource}`);
        const newItem = req.body;
        if (!newItem || typeof newItem !== 'object' || !newItem.nome || !newItem.celular || !newItem.login || !newItem.senha /* etc */) {
            return res.status(400).json({ error: `Dados inválidos ou faltando para criar ${singularName}.` });
        }

        readDatabase((err, db) => {
            if (err) return res.status(500).json({ error: `Erro ao ler ${resource} para criar.` });
            if (!Array.isArray(db?.[resource])) { db[resource] = []; }
            const items = db[resource];

            // Gera ID (UUID é mais robusto, mas vamos manter sequencial se preferir)
             newItem.id = newItem.id || crypto.randomUUID().substring(0, 4); // Gera ID curto aleatório se não vier
             // Verifica colisão (raro com UUID, mais comum com sequencial se houver deletes)
             while(items.some(i => String(i.id) === String(newItem.id))) {
                console.warn(`Colisão de ID detectada para ${resource}: ${newItem.id}. Gerando novo...`);
                newItem.id = crypto.randomUUID().substring(0, 4); // Tenta de novo
             }

            items.push(newItem);
            writeDatabase(db, (writeErr) => {
                if (writeErr) return res.status(500).json({ error: `Erro ao salvar novo ${singularName}.` });
                console.log(` -> ${singularName} criado com ID: ${newItem.id}`);
                res.status(201).json(newItem);
            });
        });
    });

    // PUT /voluntarios/:id (Atualizar)
    app.put(`/${resource}/:id`, (req, res) => {
        const id = req.params.id;
        const updatedItemData = req.body;
        console.log(`[${new Date().toISOString()}] PUT /${resource}/${id}`);
        if (!updatedItemData || typeof updatedItemData !== 'object' || !updatedItemData.nome /* etc */) {
            return res.status(400).json({ error: `Dados inválidos para atualizar ${singularName}.` });
        }

        readDatabase((err, db) => {
            if (err) return res.status(500).json({ error: `Erro ao ler ${resource} para atualizar.` });
            if (!Array.isArray(db?.[resource])) { return res.status(404).json({ error: `${singularName} não encontrado.` }); }
            const items = db[resource];
            const itemIndex = items.findIndex(i => String(i.id) === String(id));

            if (itemIndex === -1) {
                return res.status(404).json({ error: `${singularName} não encontrado.` });
            }

            items[itemIndex] = { ...items[itemIndex], ...updatedItemData, id: items[itemIndex].id };
            writeDatabase(db, (writeErr) => {
                if (writeErr) return res.status(500).json({ error: `Erro ao salvar atualização de ${singularName}.` });
                console.log(` -> ${singularName} atualizado com ID: ${id}`);
                res.status(200).json(items[itemIndex]);
            });
        });
    });

    // DELETE /voluntarios/:id (Deletar)
    app.delete(`/${resource}/:id`, (req, res) => {
        const id = req.params.id;
        console.log(`[${new Date().toISOString()}] DELETE /${resource}/${id}`);
        readDatabase((err, db) => {
            if (err) return res.status(500).json({ error: `Erro ao ler ${resource} para deletar.` });
            if (!Array.isArray(db?.[resource])) { return res.status(404).json({ error: `${singularName} não encontrado.` }); }
            let items = db[resource];
            const initialLength = items.length;
            db[resource] = items.filter(i => String(i.id) !== String(id));

            if (db[resource].length === initialLength) {
                return res.status(404).json({ error: `${singularName} não encontrado.` });
            }

            writeDatabase(db, (writeErr) => {
                if (writeErr) return res.status(500).json({ error: `Erro ao salvar após deletar ${singularName}.` });
                console.log(` -> ${singularName} deletado com ID: ${id}`);
                res.status(204).send();
            });
        });
    });
})(); // Fim do bloco Voluntarios


// ===============================================
// --- ROTAS CRUD para ENTIDADES ---
// ===============================================
(() => { // Usando IIFE para escopo
    const resource = 'entidades';
    const singularName = 'entidade';

    // GET /entidades (Ler Todos)
    app.get(`/${resource}`, (req, res) => {
        console.log(`[${new Date().toISOString()}] GET /${resource}`);
        readDatabase((err, db) => {
            if (err) return res.status(500).json({ error: `Erro ao ler ${resource}.` });
            res.status(200).json(Array.isArray(db?.[resource]) ? db[resource] : []);
        });
    });

    // GET /entidades/:id (Ler Um)
    app.get(`/${resource}/:id`, (req, res) => {
        const id = req.params.id;
        console.log(`[${new Date().toISOString()}] GET /${resource}/${id}`);
        readDatabase((err, db) => {
            if (err) return res.status(500).json({ error: `Erro ao ler ${resource}.` });
            const items = Array.isArray(db?.[resource]) ? db[resource] : [];
            const item = items.find(i => String(i.id) === String(id));
            if (item) {
                res.status(200).json(item);
            } else {
                res.status(404).json({ error: `${singularName} não encontrada.` }); // Ajuste feminino
            }
        });
    });

    // POST /entidades (Criar)
    app.post(`/${resource}`, (req, res) => {
        console.log(`[${new Date().toISOString()}] POST /${resource}`);
        const newItem = req.body;
        // Validação básica para entidade
        if (!newItem || typeof newItem !== 'object' || !newItem.nome || !newItem.endereco || !newItem.responsavel || !newItem.telefone /* etc */) {
            return res.status(400).json({ error: `Dados inválidos ou faltando para criar ${singularName}.` });
        }

        readDatabase((err, db) => {
            if (err) return res.status(500).json({ error: `Erro ao ler ${resource} para criar.` });
            if (!Array.isArray(db?.[resource])) { db[resource] = []; }
            const items = db[resource];

            newItem.id = newItem.id || crypto.randomUUID().substring(0, 4); // Gera ID curto aleatório se não vier
             while(items.some(i => String(i.id) === String(newItem.id))) {
                console.warn(`Colisão de ID detectada para ${resource}: ${newItem.id}. Gerando novo...`);
                newItem.id = crypto.randomUUID().substring(0, 4);
             }

            items.push(newItem);
            writeDatabase(db, (writeErr) => {
                if (writeErr) return res.status(500).json({ error: `Erro ao salvar nova ${singularName}.` });
                console.log(` -> ${singularName} criada com ID: ${newItem.id}`);
                res.status(201).json(newItem);
            });
        });
    });

    // PUT /entidades/:id (Atualizar)
    app.put(`/${resource}/:id`, (req, res) => {
        const id = req.params.id;
        const updatedItemData = req.body;
        console.log(`[${new Date().toISOString()}] PUT /${resource}/${id}`);
        if (!updatedItemData || typeof updatedItemData !== 'object' || !updatedItemData.nome /* etc */) {
            return res.status(400).json({ error: `Dados inválidos para atualizar ${singularName}.` });
        }

        readDatabase((err, db) => {
            if (err) return res.status(500).json({ error: `Erro ao ler ${resource} para atualizar.` });
            if (!Array.isArray(db?.[resource])) { return res.status(404).json({ error: `${singularName} não encontrada.` }); }
            const items = db[resource];
            const itemIndex = items.findIndex(i => String(i.id) === String(id));

            if (itemIndex === -1) {
                return res.status(404).json({ error: `${singularName} não encontrada.` });
            }

            items[itemIndex] = { ...items[itemIndex], ...updatedItemData, id: items[itemIndex].id };
            writeDatabase(db, (writeErr) => {
                if (writeErr) return res.status(500).json({ error: `Erro ao salvar atualização de ${singularName}.` });
                console.log(` -> ${singularName} atualizada com ID: ${id}`);
                res.status(200).json(items[itemIndex]);
            });
        });
    });

    // DELETE /entidades/:id (Deletar)
    app.delete(`/${resource}/:id`, (req, res) => {
        const id = req.params.id;
        console.log(`[${new Date().toISOString()}] DELETE /${resource}/${id}`);
        readDatabase((err, db) => {
            if (err) return res.status(500).json({ error: `Erro ao ler ${resource} para deletar.` });
            if (!Array.isArray(db?.[resource])) { return res.status(404).json({ error: `${singularName} não encontrada.` }); }
            let items = db[resource];
            const initialLength = items.length;
            db[resource] = items.filter(i => String(i.id) !== String(id));

            if (db[resource].length === initialLength) {
                return res.status(404).json({ error: `${singularName} não encontrada.` });
            }

            writeDatabase(db, (writeErr) => {
                if (writeErr) return res.status(500).json({ error: `Erro ao salvar após deletar ${singularName}.` });
                console.log(` -> ${singularName} deletada com ID: ${id}`);
                res.status(204).send();
            });
        });
    });
})(); // Fim do bloco Entidades


// ===============================================
// --- ROTAS CRUD para AGENDAMENTOS ---
// ===============================================
(() => { // Usando IIFE para escopo
    const resource = 'agendamentos';
    const singularName = 'agendamento';

    // GET /agendamentos (Ler Todos)
    app.get(`/${resource}`, (req, res) => {
        console.log(`[${new Date().toISOString()}] GET /${resource}`);
        readDatabase((err, db) => {
            if (err) return res.status(500).json({ error: `Erro ao ler ${resource}.` });
            res.status(200).json(Array.isArray(db?.[resource]) ? db[resource] : []);
        });
    });

    // GET /agendamentos/:id (Ler Um)
    app.get(`/${resource}/:id`, (req, res) => {
        const id = req.params.id;
        console.log(`[${new Date().toISOString()}] GET /${resource}/${id}`);
        readDatabase((err, db) => {
            if (err) return res.status(500).json({ error: `Erro ao ler ${resource}.` });
            const items = Array.isArray(db?.[resource]) ? db[resource] : [];
            const item = items.find(i => String(i.id) === String(id));
            if (item) {
                res.status(200).json(item);
            } else {
                res.status(404).json({ error: `${singularName} não encontrado.` });
            }
        });
    });

    // POST /agendamentos (Criar)
    app.post(`/${resource}`, (req, res) => {
        console.log(`[${new Date().toISOString()}] POST /${resource}`);
        const newItem = req.body;
        // Validação básica para agendamento
        if (!newItem || typeof newItem !== 'object' || !newItem.entidadeId || !newItem.data || !newItem.horario || !Array.isArray(newItem.voluntarioIds) /* etc */) {
            return res.status(400).json({ error: `Dados inválidos ou faltando para criar ${singularName}.` });
        }

        readDatabase((err, db) => {
            if (err) return res.status(500).json({ error: `Erro ao ler ${resource} para criar.` });
            if (!Array.isArray(db?.[resource])) { db[resource] = []; }
            const items = db[resource];

             newItem.id = newItem.id || crypto.randomUUID().substring(0, 4); // Gera ID curto aleatório se não vier
             while(items.some(i => String(i.id) === String(newItem.id))) {
                console.warn(`Colisão de ID detectada para ${resource}: ${newItem.id}. Gerando novo...`);
                newItem.id = crypto.randomUUID().substring(0, 4);
             }

            items.push(newItem);
            writeDatabase(db, (writeErr) => {
                if (writeErr) return res.status(500).json({ error: `Erro ao salvar novo ${singularName}.` });
                console.log(` -> ${singularName} criado com ID: ${newItem.id}`);
                res.status(201).json(newItem);
            });
        });
    });

    // PUT /agendamentos/:id (Atualizar)
    app.put(`/${resource}/:id`, (req, res) => {
        const id = req.params.id;
        const updatedItemData = req.body;
        console.log(`[${new Date().toISOString()}] PUT /${resource}/${id}`);
        if (!updatedItemData || typeof updatedItemData !== 'object' || !updatedItemData.entidadeId /* etc */) {
             return res.status(400).json({ error: `Dados inválidos para atualizar ${singularName}.` });
        }

        readDatabase((err, db) => {
            if (err) return res.status(500).json({ error: `Erro ao ler ${resource} para atualizar.` });
            if (!Array.isArray(db?.[resource])) { return res.status(404).json({ error: `${singularName} não encontrado.` }); }
            const items = db[resource];
            const itemIndex = items.findIndex(i => String(i.id) === String(id));

            if (itemIndex === -1) {
                return res.status(404).json({ error: `${singularName} não encontrado.` });
            }

            items[itemIndex] = { ...items[itemIndex], ...updatedItemData, id: items[itemIndex].id };
            writeDatabase(db, (writeErr) => {
                if (writeErr) return res.status(500).json({ error: `Erro ao salvar atualização de ${singularName}.` });
                console.log(` -> ${singularName} atualizado com ID: ${id}`);
                res.status(200).json(items[itemIndex]);
            });
        });
    });

    // DELETE /agendamentos/:id (Deletar)
    app.delete(`/${resource}/:id`, (req, res) => {
        const id = req.params.id;
        console.log(`[${new Date().toISOString()}] DELETE /${resource}/${id}`);
        readDatabase((err, db) => {
            if (err) return res.status(500).json({ error: `Erro ao ler ${resource} para deletar.` });
            if (!Array.isArray(db?.[resource])) { return res.status(404).json({ error: `${singularName} não encontrado.` }); }
            let items = db[resource];
            const initialLength = items.length;
            db[resource] = items.filter(i => String(i.id) !== String(id));

            if (db[resource].length === initialLength) {
                return res.status(404).json({ error: `${singularName} não encontrado.` });
            }

            writeDatabase(db, (writeErr) => {
                if (writeErr) return res.status(500).json({ error: `Erro ao salvar após deletar ${singularName}.` });
                console.log(` -> ${singularName} deletado com ID: ${id}`);
                res.status(204).send();
            });
        });
    });
})(); // Fim do bloco Agendamentos


// --- Inicia o Servidor ---
app.listen(port, () => {
    console.log(`Backend Express rodando em http://localhost:${port}`);
    console.log(`-> Login (POST):     http://localhost:${port}/api/auth/login`);
    console.log(`-> Voluntários CRUD: http://localhost:${port}/voluntarios`);
    console.log(`-> Entidades CRUD:   http://localhost:${port}/entidades`);
    console.log(`-> Agendamentos CRUD: http://localhost:${port}/agendamentos`);
    console.log(`-> Home (GET):       http://localhost:${port}/home`);
});