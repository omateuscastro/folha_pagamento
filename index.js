const express = require("express");
const bodyParser = require("body-parser");
const port = 3000

var app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
	res.render("index", { nome: "", salario: "", vendas: "", comissao: "", salario_final: "", mensagens: [] });
});

app.post("/calcular", function (req, res) {
	let mensagens = [];

	let nome = req.body.nome
	let salario = parseFloat(req.body.salario);
	let vendas = parseFloat(req.body.vendas);
	let comissao = parseFloat(req.body.comissao);

	if (!req.body.nome)
		mensagens.push("Nome não informado.");

	if (!req.body.salario)
		mensagens.push("Salário não informado.");

	if (!req.body.vendas)
		mensagens.push("Valor das Vendas não informado.");

	if (!req.body.comissao)
		mensagens.push("Percentual de Comissão não informado.");

	let salario_final = salario + ( vendas * ( comissao / 100 ) );

	res.render("index", { nome, salario: salario.toFixed(2), vendas: vendas.toFixed(2), comissao: comissao.toFixed(2), salario_final: salario_final.toFixed(2), mensagens });
});

app.listen(port, () => {
	console.log(`O FolhaPagamento está rodando em http://localhost:${port}`)
})