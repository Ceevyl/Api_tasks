const express = require("express");
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors())

let all_tasks = [];


const reorganization = (value) => {

    if (!value){
        return false
    }

    all_tasks.push( value )

    const hoje = new Date();

    for ( var i = 0; i < all_tasks.length; i++ ){
        let v = all_tasks[i];
        let x = new Date(v.date) 
        const Dias_Restantes = Math.floor(  ( x - hoje ) / ( 1000 * 60 * 60 * 24 ) )


        if (Dias_Restantes <= 2 )  {
            v.priority = "Alta";
        }else if (Dias_Restantes > 2 && Dias_Restantes <= 5){
            v.priority = "Média";
        }else{
            v.priority = "Baixa";
        }
    }

    all_tasks.sort((a, b) => {
        const prioridades = ["Alta", "Média", "Baixa"];
        return prioridades.indexOf(a.priority) - prioridades.indexOf(b.priority);
    });

    all_tasks.forEach((task, index) => {
        task.id = index + 1;
    });

};

app.get('/', (req, res) => {
    res.status(200).send('Beijinhos pra Sophia ❤️');
});

app.post('/tasks', (req, res) => {
    const body = req.body;
    if (!body) {
        return res.status(400).send('Erro ao enviar as informações.');
    }
    reorganization(body);
    res.status(200).send(all_tasks);
});

app.get('/tasks', (req, res) => {
    res.status(200).send(all_tasks)
})

app.put('/subtasks', (req, res) => { 
    const body = req.body;

})

app.listen(3000, () => {
    console.log("Servidor Rodando Com sucesso!");
});
