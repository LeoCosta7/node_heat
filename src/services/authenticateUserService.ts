/**
 * 1 Receber codigo via String
 * 2 Recuperar o access_token no github
 * 3 Recuperar infos do user no github
 * 4 Verificar se o usuário existe no DB
 * ---- SIM = Gera um toke
 * ---- NÃO = Cria um DB, gera um token
 * 5 Retorna o token com as infos do usuário logado
 */

import axios from "axios"

 interface IAccessTokenResponse{
    access_token: string;
}

interface IUserResponse{
    avatar_url: string,
    login: string,
    id: number,
    name: string;
}

class AuthenticateUserService{
    async execute(code: String){   

        //Para recuperar o access_token no github precisamos fazer uma chamada externa. 
        
       const url = "https://github.com/login/oauth/access_token";

       
       const { data: accessTokenResponse } = await axios.post<IAccessTokenResponse>(url, null,{    
        params:{
            client_id:  process.env.GITHUB_CLIENT_ID,    
            client_secret:  process.env.GITHUB_CLIENT_SECRET,
            code,
        },
        headers:{
            "Accept": "application/json"
        }
    });
    
        const response = await axios.get<IUserResponse>("https://api.github.com/user",{     //Esta URL pega todas as infos dos user logados
         headers:{
             authorization: `Bearer ${accessTokenResponse.access_token}` //Bearer é o token_type
         }
        })

    return response.data;    //Quando utilizamos o axios, toda info retornada é armazenada em "data"

    }//end
}//END

export { AuthenticateUserService }










