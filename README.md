🖥️ Backend — BarberApp API

API oficial do BarberApp, desenvolvida em Node.js + Express, responsável por toda a lógica de negócios da aplicação — incluindo agendamentos, autenticação, serviços e administração completa da barbearia.

🚀 Sobre o Backend

O backend do BarberApp garante que o painel administrativo e a página pública de agendamentos funcionem de forma rápida, confiável e segura.

Ele é responsável por:

Centralizar e tratar todos os dados

Validar requisições

Gerenciar sessões

Fazer toda a comunicação com o banco

Manter a segurança e integridade das operações

Tudo foi construído com foco em performance, segurança e organização.

⚙️ Funcionalidades da API
🔐 Autenticação

Login exclusivo para administradores

Geração e validação de JWT

Middleware protegendo rotas privadas

🗓️ Gestão de Agendamentos

Criar, editar e listar agendamentos

Controle completo de status:
Pendente · Confirmado · Cancelado · Agendado

Filtragem e atualização rápida

🧔 Administração da Barbearia

Gerenciamento de clientes

Cadastro e edição de serviços

Controle de profissionais

Dados essenciais para o dashboard do frontend

🛡️ Segurança e Qualidade

Tratamento de erros padronizado

CORS configurado

Rotas RESTful bem definidas

Senhas criptografadas com bcrypt

🛠️ Tecnologias Utilizadas

Node.js + Express

Prisma ORM

MongoDB

JWT Authentication

bcrypt

CORS

Dotenv

▶️ Como Rodar o Backend
cd backend
npm install
npm run dev


Servidor disponível em:

http://localhost:4001

🌐 Integração com o Frontend

O backend se integra diretamente ao frontend do BarberApp, disponível em:

🔗 https://www.kingsbarber.com.br/
