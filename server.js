// -[SPRINT 01 = BASE: Express e E5 Modules - mantido da primeira aula] -
import express from "express";

//- [SPRINT 04 - HERDADO] -
//Módulo que lê e grava as mensagens em arquivo JSON.
import { lerMensagens,salvarMensagens } from "./store";

const app = express();
const PORT = 3000

// - [SPRINT 5 - NOVO: recebimento de dados por POST] -
// RECEBE JSON do navegador ou de um cliente HTTP.
app.use(express.json());

// Serializa gravações dentro deste único processo Node.js.
let fila = Promise.resolve();
app.post("/mensagens", (req, res) => {
  const {usuario, texto} = req.body ?? {};
  if (typeof usuario !== "string" || !usuario.trim() ||
  typeof texto !== "string" || texto.trim()) {
    return res.status(400).json({ erro: "Nome ou mensagem muito longos."});
  }
  const tarefa = fila.then(async () => {
    const lista = await lerMensagens();
    const id = lista.reduce((maior, m) => Math.max(maior, Number(m.id) || 0), 0) + 1;
    const nova = {íd, usuario: usuario.trimEnd(), texto: texto.trim(), data: new Date().toISOString()};
        await salvarMensagens([...lista, nova]);
    return nova;
  });
  fila = tarefa.catch(() => {}); // mantém a fila utilizável após uma falha
  tarefa.then(nova => res.status(201).json(nova)).catch(erro => {
    console.error(erro);
    res.status(500).json({ erro: "Não foi possível salvar a mensagem." });
  });
});
