import {Box, Button, Text, TextField, Image} from '@skynexui/components'
import appConfig from '../config.json'


function GlobalStyle() {
    return (
      <style global jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          list-style: none;
        }
        body {
          font-family: 'Open Sans', sans-serif;
        }
        /* App fit Height */ 
        html, body, #__next {
          min-height: 100vh;
          display: flex;
          flex: 1;
        }
        #__next {
          flex: 1;
        }
        #__next > * {
          flex: 1;
        }
        /* ./App fit Height */ 
      `}</style>
    );
  }


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
    const username = 'rafaeldiastd';
  
    return (
      <>
        <GlobalStyle />
        <Box
          styleSheet={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap',
            backgroundColor: appConfig.theme.colors.primary[500],
            backgroundImage: 'url(https://i.imgur.com/FoqeLgz.jpg)',
            backgroundRepeat: 'no-repeat', backgroundSize: 'cover',
          }}
        >
          <Box
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: {
                xs: 'column',
                sm: 'row',
              },
              width: '800px', maxWidth: '700px',
              borderRadius: '10px', padding: '32px', margin: '16px',
              backgroundColor: appConfig.theme.colors.neutrals[700],
            }}
          >
            {/* Formulário */}
            <Box
              as="form"
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
                src={`https://github.com/${username}.png`}
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
                {username}
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
          <Box  // Prefiro conversar por email
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
                label='Prefiro conversar por e-mail'
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