import axios from "axios"

/**
 * 1 Receber codigo via String
 * 2 Recuperar o access_token no github
 * 3 Verificar se o usuário existe no DB
 * ---- SIM = Gera um toke
 * ---- NÃO = Cria um DB, gera um token
 * 4 Retorna o token com as infos do usuário logado
 */


class AuthenticateUserService{
    async execute(code: String){   

        //Para recuperar o access_token no github precisamos fazer uma chamada externa. 
        
       const url = "https://github.com/login/oauth/access_token";

       const response = await axios.post(url, null,{    //Fazendo a chamada.
           params:{
               client_id:  process.env.GITHUB_CLIENT_ID,    
               client_secret:  process.env.GITHUB_CLIENT_SECRET,
               code,
           },
           headers:{
               "Accept": "application/json"
           }
       });
        
       return response.data;    //Quando utilizamos o axios toda info retornada é armazenada em "data"
    }
}

export { AuthenticateUserService }










