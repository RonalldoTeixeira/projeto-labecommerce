import express from 'express'
import cors from 'cors'
import itensRouter from './routers/itens-router'

// Porta do servidor
const PORT = process.env.PORT || 4000

// Host do servidor
const HOSTNAME = process.env.HOSTNAME || 'http://localhost'


const app = express()

// JSON
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Endpoint raiz
app.get('/', (req, res) => {
    res.send('Bem-vindo!')
})


app.use(cors({
	origin: ['http://localhost:3000']
}))

// Rotas
app.use('/api', itensRouter)

// Resposta padrão para quaisquer outras requisições
app.use((req, res) => {
    res.status(404)
})


app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso ${HOSTNAME}:${PORT}`)
})
