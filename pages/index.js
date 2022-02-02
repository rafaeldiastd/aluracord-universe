import {Box, Button, Text, TextField, Image} from '@skynexui/components'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import appConfig from '../config.json';



function Titulo(props) {
    const Tag = props.tag || 'h1';
    return (
        <>
            <Tag>{ props.children }</Tag>
            <style jsx>{`
            ${Tag} {
                color: ${appConfig.theme.colors.neutrals['000']};
                font-size: 24px;
                font-weight: 600;
            }
            `}</style>
        </>
    );
}

export default function PaginaInicial() { 
  
  const [username, setUsername] = useState(''); // Define a variavel username usando react useState, que gera uma outra variavel chamada setUsername, essa variavel é uma array que recebe dois valores. o Antigo e o Novo.
  const router = useRouter(); // Importei do next, uma funcao chamada useRouter e apliquei ela em uma variavel
  const [dadosDoGitHub, setDadosDoGitHub] = useState({});

  

  useEffect(() => {
  fetch (`https://api.github.com/users/${username}`)
  .then ((respostaDoGit) => {
    return respostaDoGit.json();
  })
  .then ((respostaDoGitConvertida) => {
    setDadosDoGitHub(respostaDoGitConvertida);
    console.log(respostaDoGitConvertida.avatar_url)
  })
  }, [username]);

  
  const nomeuser = dadosDoGitHub.name;
  
return (
      <>
          
        <Box
          styleSheet={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap',
            backgroundColor: appConfig.theme.colors.primary[500],
            backgroundImage: appConfig.theme.images.bg,
            backgroundRepeat: 'no-repeat', backgroundSize: 'cover',
          }}
        >

          

          <Box
            styleSheet={{
              display: 'flex',
              alignItems: 'center',              
              justifyContent: 'space-evenly',
              flexDirection: {
                xs: 'column',
                sm: 'row',
              },
              width: '800px', maxWidth: '700px',
              borderRadius: '10px', padding: '30px', margin: '16px',
              backgroundColor: appConfig.theme.colors.neutrals[700],
            }}
          >
            <Box
              as="form"
              onSubmit={(e) => {
                e.preventDefault()
                if(username.length >= 2){ router.push(`/chat?username=${username}&name=${nomeuser}`) }
              }}

              styleSheet={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
              }}
            >
              <Titulo tag="h2">{appConfig.projectname}</Titulo>
              <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
                {appConfig.projectsub}
              </Text>
  
              <TextField
                fullWidth
                value={username} // Valor da variavel
                onChange= {
                  function handler (event) { // Uma função de handler, que pega o que o usuário fez
                  const valor = event.target.value; // Define uma variavel para armazenar o dado. O dado é, o valor do que foi alvo do evento. (no caso o clique na tecla)
                  setUsername(valor); // Seta um novo valor para a Username
  
                  }
                }
                textFieldColors={{
                  neutral: {
                    textColor: appConfig.theme.colors.neutrals[200],
                    mainColor: appConfig.theme.colors.neutrals[900],
                    mainColorHighlight: appConfig.theme.colors.primary[500],
                    backgroundColor: appConfig.theme.colors.neutrals[800],
                  },
                }}
              />

              
              <Button
                type='submit'
                label='Entrar'
                fullWidth
                buttonColors={{
                  contrastColor: appConfig.theme.colors.neutrals["000"],
                  mainColor: appConfig.theme.colors.primary[500],
                  mainColorLight: appConfig.theme.colors.primary[400],
                  mainColorStrong: appConfig.theme.colors.primary[600],
                }}
              />
            </Box>
            {/* Formulário */}
  
  
            {/* Photo Area */}
            <Box
              styleSheet={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '200px',
                padding: '16px',
                backgroundColor: appConfig.theme.colors.neutrals[800],
                border: '1px solid',
                borderColor: appConfig.theme.colors.neutrals[999],
                borderRadius: '10px',
                flex: 1,
                minHeight: '240px',
              }}
            >
              <Image
                styleSheet={{
                  borderRadius: '50%',
                  marginBottom: '16px',
                }}
                src={dadosDoGitHub.avatar_url}
              />
              <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals["400"],
                padding: '3px 10px',
                borderRadius: '1000px'
              }}
            >
           {dadosDoGitHub.login}
            </Text>
              <Text
                variant="body4"
                styleSheet={{
                  color: appConfig.theme.colors.neutrals[200],
                  paddingTop: "15px",
                  textAlign: "center"
                }}
              >
             
              <p>{dadosDoGitHub.name}</p>
              <p>{dadosDoGitHub.location}</p>
                
              </Text>
            </Box>
            {/* Photo Area */}
          </Box>
          <Box>
          <Box // Como funciona o Chat
            styleSheet={{
              display: 'flex',
              justifyContent: 'start',
              flexFlow: 'row wrap',
              flexDirection: {
                xs: 'column',
                sm: 'column',
              },
              width: '100%', maxWidth: '350px', height: '80%',
              borderRadius: '10px', padding: '32px', margin: '16px',
              backgroundColor: appConfig.theme.colors.neutrals[700],
            }}
          >
              
              <Titulo tag="h2">Como funciona o chat?</Titulo>
              <Text variant="body3" styleSheet={{ marginTop: '16px', color: appConfig.theme.colors.neutrals[300] }}>
              <span>Este é o espaço de conversa entre o cliente e nosso equipe de atendimento. Tire todas suas dúvidas dentro de um espaço seguro, em poucos minutos.</span>
              </Text>

          </Box>
          <Box  // ver as redes
            styleSheet={{
              display: 'flex',
              justifyContent: 'start',
              width: '100%', maxWidth: '350px', height: '20%',
              borderRadius: '10px', padding: '32px', margin: '16px',
              backgroundColor: appConfig.theme.colors.neutrals[700],
            }}
          >
          <Button
                type='submit'
                label='Prefiro falar por e-mail'
                
                fullWidth
                buttonColors={{
                  contrastColor: appConfig.theme.colors.neutrals["000"],
                  mainColor: appConfig.theme.colors.primary[500],
                  mainColorLight: appConfig.theme.colors.primary[400],
                  mainColorStrong: appConfig.theme.colors.primary[600],
                }}
              />
          </Box>
          </Box>
        </Box>
      </>
    );
  }