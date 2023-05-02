import sqlite3 from 'sqlite3'

const DBSOURCE = 'db.sqlite'

const SQL_CADASTRO_CREATE = `
    CREATE TABLE itens (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT,
        email TEXT
    )`

const database = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message)
        throw err
    } else {
        console.log('dados conectados com sucesso.')
        database.run(SQL_CADASTRO_CREATE, (err) => {
            if (err) {
                
            } else {
                console.log('Tabela Cadastro criada com sucesso.')
            }
        })
    }
})

export default database