<h3 align="center">
<img width="300" alt="Logo - Flor de Charme" src="https://github.com/user-attachments/assets/e7bda5bb-7037-4806-95b9-a8e4c6bfffbe" />
</h3>

## ❓ Qual problema queremos resolver?

O Departamento de Vendas da indústria Beleza Flor de Charme percebeu, após estudos de mercado, que para aumentar sua eficiência comercial seria necessário adquirir uma frota própria de veículos para apoiar e motorizar seus vendedores.

Além disso, o mercado consumidor foi dividido em regiões de venda, cada uma composta por pontos estratégicos, e vendedores foram designados para percorrer essas áreas.

Diante dessa nova organização, torna-se essencial um sistema que permita administrar as regiões, os vendedores, os veículos, os clientes e todo o processo de vendas, garantindo maior controle e produtividade.

## 👥 Público-alvo

O sistema é voltado para vendedores e gestores da Flor de Charme, oferecendo ferramentas para gerenciar clientes, vendas, produtos, veículos e regiões de maneira prática, segura e integrada.

## 💡Situação Problema

O Departamento de Vendas da Indústria Beleza Flor de Charme, após estudos de mercado, verificou que para atingir seus objetivos seria necessário adquirir frota de veículos próprios para motorizar seus vendedores

O mercado consumidor foi dividido em regiões de venda; foram estabelecidos percursos de entrega abrangendo pontos estratégicos dessas regiões e vendedores foram designados para cobrir estes percursos. 

Um sistema deve ser construído para administração da nova sistemática de vendas adotada pela empresa. 

Após entrevistas com o gerente da área, foram obtidas as seguintes informações:
- Cada região é identificada por um código; 
- Uma região é composta de vários pontos estratégicos; 
- As regiões não têm pontos estratégicos em comum;
- O vendedor tem a responsabilidade de cobrir uma região;
- Uma região pode ser coberta por vários vendedores;
- A cada dia, um veículo fica sob a responsabilidade de um vendedor; 
- Um vendedor pode vender quaisquer itens ativos da tabela de produtos; 
- O vendedor é responsável pela identificação de cada cliente consumidor na nota fiscal; 
- A nota fiscal contendo identificação do vendedor, itens e quantidades vendidas é exigida para comprovação da venda.

## 💡 Quais os requisitos do sistema?

Oferecemos uma aplicação web, combinando:

Login: o vendedor acessa a conta com o CPF e a senha.

- 1.Venda:
Para vender, seleciona o cliente, os produtos e quantidade;

    O sistema gera o total da compra e a nota fiscal;
    
    O vendedor pode ver o histórico das notas fiscais.

- 2.Produtos:
Todos os produtos que não foram vendidos;

    Todos os produtos que foram vendidos por um determinado vendedor;
    
    Os produtos podem ser editados, criados ou visualizados.

- 3.Cliente:
O vendedor pode visualizar, cadastrar e editar um cliente.

- 4.Carro/Veículo:
Alocar um carro (uso_veiculo -> escolher um carro e a data);

    Visualizar todos os vendedores e o carro que usaram no último mês;
    
    Listar histórico de utilização do veiculo.

- 5.Região
Lista o nome das regiões;

    Lista os pontos estratégicos das regiões;
    
    Lista os vendedores responsáveis pela região.

🔗 Acesse a aplicação: [flordecharme.vercel.app](https://flordecharme.vercel.app//)

---

## 🔧 Tecnologias Utilizadas no Projeto

### ⚛ React.js
- Biblioteca JavaScript para construção da interface de forma componente reutilizável.

- Permitiu Organizar a interface em componentes (Navbar, FormularioLogin, etc.).

- Utiliza JSX (JavaScript + HTML) para criar a UI de forma declarativa.

- Manipula estado com useState, useEffect, etc., para interações dinâmicas e reativas.

### ⚡ Vite
- Biblioteca JavaScript para construção da interface de forma componente reutilizável.

- Permitiu Organizar a interface em componentes (Navbar, CardRoupas, FormularioLogin, etc.).

- Utiliza JSX (JavaScript + HTML) para criar a UI de forma declarativa.

- Manipula estado com useState, useEffect, etc., para interações dinâmicas e reativas.

### 🎨 CSS Modules
- CSS Modules permitiu estilos com escopo local por componente.

- Evitou conflitos de classe como  ter apenas .container global controlando tudo.
  
### ❗ SweetAlert2
- O SweetAlert2 é uma biblioteca JavaScript que foi usada para exibir alertas personalizados e estilizados, substituindo os alertas nativos do navegador (alert(), confirm(), etc.).

### ▲ Vercel
- Plataforma de deploy e hospedagem contínua utilizada para publicar a aplicação, com suporte para projetos Vite + React, gerenciamento de variáveis de ambiente e integração com GitHub.

## ✨ Imagens do Projeto
<h3 align="center">
<img width="959" height="501" alt="image" src="https://github.com/user-attachments/assets/43183914-af7e-49f8-ac27-9c5a8f708856" />
<img width="959" height="503" alt="image" src="https://github.com/user-attachments/assets/c8fd8618-3795-4750-bd83-ce7304ea983e" />
<img width="959" height="501" alt="image" src="https://github.com/user-attachments/assets/9942e788-2563-433a-89c4-5b83225f33ff" />
<img width="959" height="502" alt="image" src="https://github.com/user-attachments/assets/6c7c44b3-9d46-4f15-b49d-2bcfa97feb03" />
<img width="959" height="503" alt="image" src="https://github.com/user-attachments/assets/468ab5e3-0fd9-4392-b22f-424632e2041a" />
<img width="959" height="501" alt="image" src="https://github.com/user-attachments/assets/ca511f41-2550-491e-aee8-03c5e8e2b5a5" />
<img width="959" height="502" alt="image" src="https://github.com/user-attachments/assets/438a7e57-1bd8-4c45-a149-d65e92c1c054" />
<img width="959" height="502" alt="image" src="https://github.com/user-attachments/assets/be754577-251f-49c6-b80d-7bda0608d095" />
<img width="959" height="500" alt="image" src="https://github.com/user-attachments/assets/5862889d-9508-4fac-b2d4-216fdeacc85a" />
</h3>

## ✨ Desenvolvedoras do Projeto

<table align="center">
  <tr>
    <td align="center">
      <a href="https://github.com/J0vana23">
        <img src="https://avatars.githubusercontent.com/u/125403554?v=4" width="135px;" alt="Jovana - Github"/><br>
        <sub><b>Jovana Oliveira</b></sub><br>
      </a>
      <sub>
        <a href="mailto:jovana.silva01@etec.sp.gov.br">jovana.silva01@etec.sp.gov.br</a>
      </sub><br>
      <sub>
        <a href="mailto:jovanaoliveira230807@gmail.com">jovanaoliveira230807@gmail.com</a>
      </sub>
    </td>
    <td align="center">
      <a href="https://github.com/Kakventura">
        <img src="https://avatars.githubusercontent.com/u/125403596?v=4" width="135px;" alt="Karinne Angelo - Github"/><br>
        <sub><b>Karinne Angelo</b></sub><br>
      </a>
      <sub>
        <a href="mailto:kakaangelo25@gmail.com">kakaangelo25@gmail.com</a>
      </sub><br>
      <sub>
        <a href="mailto:karinne.ventura@etec.sp.gov.br">karinne.ventura@etec.sp.gov.br</a>
      </sub>
    </td>
    <td align="center">
      <a href="https://github.com/Lehguanaes">
        <img src="https://avatars.githubusercontent.com/u/125403978?v=4" width="135px;" alt="Letícia - Github"/><br>
        <sub><b>Letícia Guanaes</b></sub><br>
      </a>
      <sub>
        <a href="mailto:lehguanaes@gmail.com">lehguanaes@gmail.com</a>
      </sub><br>
      <sub>
        <a href="mailto:leticia.moreira66@etec.sp.gov.br">leticia.moreira66@etec.sp.gov.br</a>
      </sub>
    </td>
    <td align="center">
      <a href="https://github.com/dudinhxzs">
        <img src="https://avatars.githubusercontent.com/u/125403489?v=4" width="135px;" alt="Maria - Github"/><br>
        <sub><b>Maria Eduarda</b></sub><br>
      </a>
      <sub>
        <a href="mailto:monteiroviana2@gmail.com">monteiroviana2@gmail.com</a>
      </sub><br>
      <sub>
        <a href="mailto:maria.viana57@etec.sp.gov.br">maria.viana57@etec.sp.gov.br</a>
      </sub>
    </td>
  </tr>
</table>

<h3 align="center">
 Flor de Charme!
</h3>

<h3 align="center">

✨ ETEC Zona Leste ✨
  
</h3>

<h3 align="center">
 __________________
  
</h3>
