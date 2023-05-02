import express from 'express'
import Item from '../models/item'

import cadastroRepository from '../repositories/cadastro-repository'


const itensRouter = express.Router()

itensRouter.post('/itens', (req, res) => {
    res.send('Cria novo cadastro')
})

itensRouter.get('/itens', (req, res) => {
    res.send('Lê todos os cadastrados')
})

itensRouter.get('/itens/:id', (req, res) => {
    const id: number = +req.params.id
    res.send(`lê um cadastro ${id}`)
})

itensRouter.put('/itens/:id', (req, res) => {
    const id: number = +req.params.id
    res.send(`Atualizar um cadastro ${id}`)
})

itensRouter.delete('/itens/:id', (req, res) => {
    const id: number = +req.params.id
    res.send(`Apaga o cadastro ${id}`)
})

export default itensRouter

itensRouter.get('/itens', (req, res) => {
    const itens: Item[] = [
        {
            id: 0o1,
            nome: 'Zureide Silveira',
            email: 'zureide2@email.com'
        },
        {
            id: 0o2,
            nome: 'Ataliba Amaral',
            email: '"ataliba0@email.com'
        },
        {
            id: 0o3,
            nome: 'Roberval De Jesus',
            email: '"roberval@email.com'
        },
        {
            id: 0o4,
            nome: 'Gorete Lafaiete',
            email: 'Gorete@email.com'
        },
        {
            id: 0o5,
            nome: 'Amadeu Lima',
            email: 'Lima001@email.com'
        },
    ]
    res.json(itens)
})

itensRouter.get('/itens/:id', (req, res) => {
    const id: number = +req.params.id
    const item: Item = {
        id: id,
        nome: `Usuário ${id}`,
        email: `email do Cadastro ${id}`
    }
    res.json(item)
    res.status(404).send()
})

itensRouter.post('/itens', (req, res) => {
    const item: Item = req.body
    //Criando e salvando um novo item
    const id = 123
    res.status(201).location(`/itens/${id}`).send()
})

itensRouter.put('/itens/:id', (req, res) => {
    const id: number = +req.params.id
    res.status(204).send()
})

itensRouter.delete('/itens/:id', (req, res) => {
    const id: number = +req.params.id
    res.status(204).send()
})

itensRouter.post('/itens', (req, res) => {
    const item: Item = req.body
    cadastroRepository.criar(item, (id) => {
        if (id) {
            res.status(201).location(`/itens/${id}`).send()
        } else {
            res.status(400).send()
        }
    })
})
itensRouter.get('/itens', (req, res) => {
    cadastroRepository.lerTodos((itens) => res.json(itens))
})
itensRouter.get('/itens/:id', (req, res) => {
    const id: number = +req.params.id
    cadastroRepository.ler(id, (item) => {
        if (item) {
            res.json(item)
        } else {
            res.status(404).send()
        }
    })
})
itensRouter.put('/itens/:id', (req, res) => {
    const id: number = +req.params.id
    cadastroRepository.atualizar(id, req.body, (notFound) => {
        if (notFound) {
            res.status(404).send()
        } else {
            res.status(204).send()
        }
    })
})

itensRouter.delete('/itens/:id', (req, res) => {
    const id: number = +req.params.id
    cadastroRepository.apagar(id, (notFound) => {
        if (notFound) {
            res.status(404).send()
        } else {
            res.status(204).send()
        }
    })
})