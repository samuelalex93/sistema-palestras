CREATE TABLE IF NOT EXISTS usuarios (
 ID INT PRIMARY KEY AUTO_INCREMENT,
 email VARCHAR(255),
 nome VARCHAR(255),
 senha VARCHAR(255),
 admin BOOLEAN DEFAULT 0
);

INSERT INTO usuarios(email,nome,admin, senha) VALUES ('teste@gmail.com', 'teste',
1, '12345678');

Create table palestra(
id int primary key auto_increment,
titulo varchar(255),
descricao varchar(255),
nomePalestrante varchar(255),
localEvento varchar (255),
dataEvento TIMESTAMP
)

CREATE TABLE inscricoes (
 id INT PRIMARY KEY AUTO_INCREMENT,
 idUsuario INT,
 idPalestra INT,
 FOREIGN KEY (idUsuario) REFERENCES usuarios(id),
 FOREIGN KEY (idPalestra) REFERENCES palestra(id),
 UNIQUE (idUsuario, idPalestra)
);