const express = require("express")
const app = express();

app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).send('Servidor de Tasks <3 by Ceevyl')
})

app.post('/tasks', (req, res) => {
    const body = req.body;
    console.log(body)
    res.status(200).send(body)
})



app.listen(3000, ()=> {
    console.log("Servidor Rodando Com sucesso!")
})