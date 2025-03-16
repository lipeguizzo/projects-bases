# Django Ninja

## 📌 Sobre
Este projeto utiliza o [Django Ninja](https://django-ninja.rest-framework.com/) para construir uma API eficiente e moderna com suporte a OpenAPI e tipagem nativa do Python.

## 🚀 Tecnologias
- Python 3.x
- Django
- Django Ninja
- PostgreSQL (ou outro banco de dados configurado)
- Docker (opcional)

## 📦 Instalação

### 1. Clonar o repositório
```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

### 2. Criar ambiente virtual
```bash
python -m venv venv
source venv/bin/activate  # Linux/macOS
venv\Scripts\activate  # Windows
```

### 3. Instalar dependências
```bash
pip install -r requirements.txt
```

### 4. Configurar variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto e configure as variáveis necessárias, como exemplo:
```
PORT=8000
```

### 5. Rodar as migrações
```bash
python manage.py migrate
```

### 6. Rodar a seed
```bash
python manage.py seed
```

### 7. Executar o servidor
```bash
python manage.py runserver
```

## 🛠 Uso da API
A documentação interativa da API pode ser acessada após iniciar o servidor em:
- Swagger UI: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

## 🐳 Utilizando Docker (Opcional)
Se desejar rodar o projeto com Docker, utilize:
```bash
docker-compose up --build
```

## 📜 Licença
Este projeto é licenciado sob a [MIT License](LICENSE).
